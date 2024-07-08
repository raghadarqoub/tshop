import mongoose , {model, Schema , Types} from "mongoose";
const productSchema = new Schema({
    name:{ 
        type:String,
        unique: true,
        required:true,
        trim:true,
    },
    slug:{
    type:String,
    required:true,
    },
    description:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required:true,
    },
    discount :{
        type:Number,
        default:0,
    },
    finalPrice:{
        type:Number,
    },
    mainImage:{
        type:Object,
        required:true,
    },
    subImges:[{
        type:Object,
        required:true,
    }],
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    sizes:[{
        enum:['s','m','l','xl','xxl'],
    }],
    color:[String],
    categoryId :{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
    },
    subCategoryId :{
        type:Types.ObjectId,
        ref:'SubCategory',
        required:true,
    },
    createdBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
    },{
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true},
    });
productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId',
    justOne: false,
});


const productModel=model('Product',productSchema);
export default  productModel;