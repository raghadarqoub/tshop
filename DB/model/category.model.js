import mongoose ,{ model, Schema, Types} from "mongoose";
const categorySchema = new Schema({
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
    createdBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});
categorySchema.virtual("subcategory",{
    localField:'_id',
    foreignField:'CategoryId',
    ref:'SubCategory',
    
})

const categoryModel=model("Category",categorySchema);
export default categoryModel;