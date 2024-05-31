import mongoose ,{ model, Schema, Types} from "mongoose";
const subcategorySchema = new Schema({
    name:{ 
        type:String,
        unique: true,
        required:true,
    },
    slug:{
    type:String,
    required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','NotActive'],
    },
    CategoryId :{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
    },
    createdBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
    },{
        timestamps:true,
    });
    const subcategoryModel=model("SubCategory",subcategorySchema);
    export default subcategoryModel;