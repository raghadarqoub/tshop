import userModel from "../../../DB/model/user.model.js";

export const getUsers = async (req, res) => {
    const users = await userModel.find({});
    return res.json({message:"success",users});
} 
export const getUserData = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    return res.json({message:"success",user});
}