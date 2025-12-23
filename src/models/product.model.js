import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
            index:true,
        },
        variety: {
            type:String,
            required: true,
            default: "1 unit",
        },
        mrp: {
            type:Number,
            required: true,
            min: 0,
            default: 0
        },
        price: {
            type:Number,
            required: true,
            min: 0,
        },
        totalOrders: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: String,
            required: true,
            index: true,
        },
        photos: [{type: String}],
        isActive: {
            type: Boolean,
            default: true,
        },
        description: {
            type: String,
            trim: true,
        },
        
    },{timestamps: true}
)

productSchema.plugin(mongooseAggregatePaginate)


export default mongoose.model("Product", productSchema);
