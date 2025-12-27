import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
