import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
      default: 'pending',
    },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["Cash on Delivery", "UPI", "NetBanking"],
            default:"Cash on Delivery",
        }, 
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        netAmount: {
            type: Number,
            required: true,
        },
        discountedAmount: {
            type: Number,
            required: true,
            default: 0
        },
        additionalCharges: {
            type: Number,
            required: true,
            default: 0
        },
items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true, // snapshot price
        },
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    },{timestamps:true}
)


export const Order = mongoose.model("Order", orderSchema)