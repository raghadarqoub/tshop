// import { pipeline } from 'nodemailer/lib/xoauth2/index.js';
import couponModel from '../../../DB/model/coupon.model.js';
import cartModel from './../../../DB/model/cart.model.js';
import productModel from './../../../DB/model/prouduct.model.js';
// import productModel from '../../../DB/model/prouduct.model.js';
import orderModel from './../../../DB/model/order.model.js';
// import productModel from './../../../DB/model/prouduct.model.js';
export const createOrder = async (req, res) => {
  const { couponName } = req.body;
const cart = await cartModel.findOne({userId:req.user._id});
if (!cart || cart.products.length == 0) {
  return res.status(400).json({ message: "cart is empty" });
}
  req.body.products = cart.products;
if (couponName) {
  const coupon = await couponModel.findOne({ name:couponName });
  if (!coupon) {
    return res.status(400).json({ message: "coupon not found" });
  }
  if(coupon.expireDate < new Date()){
    return res.status(400).json({ message: "coupon expired" });
  }
  if(coupon.usedBy.includes(req.user._id)){
    return res.status(409).json({message: "coupon already used"});
  }
  req.body.coupon = coupon;
}
let finalProductList=[];
let subTotal = 0;
for (let product of req.body.products) {
  const checkProduct = await productModel.findOne({
      _id:product.productId,
      stock:{$gte:product.quantity}
    });
    if(!checkProduct){
      return res.status(400).json({message:'product quantity not available'});
    }
    product=product.toObject();
    product.name=checkProduct.name;
    product.unitPrice=checkProduct.price;
    product.discount=checkProduct.discount;
    product.finalPrice=product.quantity * checkProduct.finalPrice; 
    subTotal += product.finalPrice;
    finalProductList.push(product)

}
const user =await userModel.findById(req.user._id);
if(!req.user.address){
  req.user.address=user.address;
}
if(!req.user.phone){
  req.user.phone=user.phone;
}
const order =await orderModel.create({
userId:req.user._id,
products:finalProductList,
finalPrice:subTotal - (subTotal * (req.body.coupon?.amount || 0)) / 100,
address:body.address,
phone:body.phone,
updateBy:req.user._id
});
if(order){
  for (const product of req.body.products) {
  await productModel.findOneAndUpdate({_id:product.productId},
    {
    $inc:{
        stock:-product.quantity
    }
  }
)
}
if(req.body.coupon){
  await couponModel.findOneAndUpdate({_id:req.body.coupon._id},
    {
    $addToSet:{
        usedBy:req.user._id
    }
  }
)
}
await cartModel.findOne({userId:req.user._id},{
  products:[],
})
}
// return res.json( {finalProductList,subTotal });
return res.json({message:"success",order});
}
export const getOrders = async (req, res) => {
  const orders = await orderModel.find({$or:[{status:"pending"},{status:"confirmed"}]});
  return res.json({message:"success",orders});
} 
export const getUserOrders = async (req, res) => {
const ordars = await orderModel.find({userId:req.user._id});
return res.json({message:"success",ordars});
}
export const changeStatus = async (req, res) => {
  const {orderId} = req.params;
  const {status} = req.body;
  const order = await orderModel.findById({orderId});
  if(!order){
    return res.status(404).json({message:"order not found"});
  }
  order.status = status;
  await order.save();
  return res.json({message:"success",order});
}