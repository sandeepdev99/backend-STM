import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
    {
        order_id: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        product_id:{
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        soldPrice: {
            type: Number,
            required: true
        }
    },{timestamps: true}
)
export const OrderItem = mongoose.model("OrderItem", orderItemSchema)