import {Order} from '../models/order.model.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';


export const placeOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress } = req.body;

  if (!items || items.length === 0) {
    throw new ApiError(400, 'Order items required');
  }

  if (!deliveryAddress) {
    throw new ApiError(400, 'Delivery address required');
  }

  let totalAmount = 0;
  const processedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product || !product.isActive) {
      throw new ApiError(404, 'Product not available');
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `Insufficient stock for ${product.name}`
      );
    }

    // calculate price snapshot
    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    processedItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
    });

    // reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: req.user.id,
    items: processedItems,
    totalAmount,
    deliveryAddress,
  });

  res.status(201).json(
    new ApiResponse(201, order, 'Order placed successfully')
  );
});



export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('items.product', 'name image')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, orders));
});


export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'fullName username')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, orders));
});



export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  order.orderStatus = status;
  await order.save();

  res.status(200).json(
    new ApiResponse(200, order, 'Order status updated')
  );
});
