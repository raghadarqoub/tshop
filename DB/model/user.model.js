import mongoose ,{ model, Schema} from "mongoose";
const userSchema = new Schema({
    userName: { 
        type:String,
        required: true,
        minlength:4,
        maxlength:20,
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    image:{
        type: Object,
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
    },
    confirmeEmail:{
        type: Boolean,
    default: false,
    },
    gender:{
        type: String,
        enum: ["Male", "Female"],
    },
    status:{
        type: String,
        default: 'Active',
        enum: ["Active", "NotActive"],
    },
    role: {
        type: String,
        default: 'User',
        enum: ["User", "Admin"],
    },
        sendCode:{
            type:String,
            default:null,
        },
},
{
    timestamps: true,
});

const userModel = model("User", userSchema);

export default userModel;