import crypto from 'crypto';
import razorpay from '../config/payment.js';
import {Order} from '../models/order.model.js';
import Payment from '../models/payment.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalAmount * 100, // paise
    currency: 'INR',
    receipt: `receipt_${order._id}`,
  });

  await Payment.create({
    order: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: order.totalAmount,
  });

  res.status(200).json(
    new ApiResponse(200, {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    })
  );
});


export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, 'Payment verification failed');
  }

  const payment = await Payment.findOne({
    razorpayOrderId: razorpay_order_id,
  });

  if (!payment) {
    throw new ApiError(404, 'Payment record not found');
  }

  payment.razorpayPaymentId = razorpay_payment_id;
  payment.razorpaySignature = razorpay_signature;
  payment.status = 'paid';
  await payment.save();

  await Order.findByIdAndUpdate(payment.order, {
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
  });

  res.status(200).json(
    new ApiResponse(200, null, 'Payment verified successfully')
  );
});
