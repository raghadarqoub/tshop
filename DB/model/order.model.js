import mongoose , {model, Schema, Types} from "mongoose";
const orderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        },
        couponId: {
        type: Types.ObjectId,
        ref: "Coupon",
        },
        products: [
        {
            productName: { type: String
            },
            productId: { type: Types.ObjectId,
                ref: "Product", 
                required: true 
            },
            quantity: { type: Number, 
                default: 1, 
                required: true 
            },
            unitPrice: { type: Number, 
                required: true 
            },
            finalPrice: { type: Number, 
                required: true 
            },
        },
        ],
        finalPrice: { type: Number, 
            required: true 
        },
        address: { type: String, 
            required: true },
        phone: { type: String, 
            required: true 
        },
        paymentType: { type: String, 
            enum: ["Cash", "Card"],
            default: "Cash", 
            required: true 
        },
        status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Delivered", "Confirmed" , "Canceled", "Onway"],
        required: true,
        }, 
        notes: { type: String 

        },
        rejectedReason: { 
            type: String 
        },
        updateBy: { 
            type: Types.ObjectId,
            ref: "User", 
            required: true 
        },
    },
    {
        timestamps: true,
})

const orderModel = model("Order",orderSchema);
export default orderModel;
