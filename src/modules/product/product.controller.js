import categoryModel from './../../../DB/model/category.model.js';
import subcategoryModel from './../../../DB/model/subcategory.model.js';
import cloudinary from './../../utls/cloudinary.js';
import slugify from 'slugify';
export const create= async (req, res) => {
    const {name ,price, discount,categoryId,subCategoryId}=req.body;
    const checkCategory=await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"category not found"});
    } 
    const checkSubCategory=await subcategoryModel.findOne({_id:subCategoryId,categoryId:categoryId});
    if(!checkSubCategory){
        return res.status(404).json({message:"sub category not found"});
    }
    req.body.slug=slugify(name);
    req.body.finalPrice=price -((price * (discount || 0 ))/ 100);

    const {secure_url ,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`${process.env.APPNAME}/products/${name}`});
        req.body.mainImage= {secure_url,public_id};
        req.body.subImges=[];
        for(const file of req.files.subImages){
            const {secure_url ,public_id} = await cloudinary.uploader.upload(file.path,
                {folder:`${process.env.APPNAME}/products/${name}/subImages`});
                req.body.subImages.push({secure_url,public_id});
}
    const product =await productModel.create (req.body);
    return res.status(201).json({message:"success",product});
}