import reviewModel from '../../../DB/model/review.model.js';
import orderModel from './../../../DB/model/order.model.js';
export const create = async (req, res) => {
    const {productId} = req.params;
    const {comment ,rating} = req.body;
    const order= await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        'products.productId':productId,
    });

    if(!order){
        return res.status(404).json({message:"can't review this order"});
    } 
    const checkReviwe = await reviewModel.findOne({
        userId:req.user._id,
        productId:productId,
    });
    if(checkReviwe){
        return res.status(409).json({message:"you already reviewed this order"});
    }
    if(req.file){
        const {secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder:`${process.env.APPNAME}/${productId}/reviews`
        });
        req.body.image = {secure_url, public_id};
    }
    const review = await reviewModel.create({
        comment,rating,
        productId,userId:req.user._id,
        Image:req.body.image
    });
    return res.json({message:"success",review});
}