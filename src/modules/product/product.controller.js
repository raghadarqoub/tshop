import productModel from '../../../DB/model/prouduct.model.js';
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

export const getProducts= async (req, res) => {
    const {skip,limit }= pagination(req.query.page ,req.query.limit);
    let queryobj= {...req.query};//debCopy
    const execQuery=['page','limit','sort','fields','search'];
    execQuery.map((ele)=>{
        delete queryobj[ele];
    });// hon bser shallowCopy
    queryobj=JSON.stringify(queryobj);
    queryobj=queryobj.replace(/gt|gte|lt|lte|in|nin|eq/g,match=>`$${match}`);
    queryobj=JSON.parse(queryobj);
    const mongooseQuery=productModel.find(queryobj).skip(skip).limit(limit).populate({
    path:"reviews",
    populate:{
        path:"userId"
    },
});
if(req.query.search){
    mongooseQuery.find({
        $or:[
            {name:{$regex:req.query.search}},
            {description:{$regex:req.query.search}}
        ]
    });
}
const count= await productModel.estimatedDocumentCount();
mongooseQuery.select(req.query.fields);
// m3 - tnazly bdon - tsh3dy fe al sort
    const products=await mongooseQuery.sort(req.query.sort);
    return res.json({message:"success",count,products});
}  