import userModel from './../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utls/email.js';
import { customAlphabet, nanoid } from 'nanoid';
import xlsx from "xlsx";
export const register= async (req, res) => {
    const {userName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({userName, email, password:hashedPassword});
    const token =jwt.sign({email},process.env.CONFIRM_EMAILTOKEN);
    await sendEmail(email, `welcome`,userName,token);
    return res.status(201).json({ message:"success" , user: createUser});
};
export const addUserExcel = async (req, res) => {
    const webhook=xlsx.readFile(req.file.path);
    const worksheet=webhook.Sheets[webhook.SheetNames[0]];
    const users=xlsx.utils.sheet_to_json(worksheet);
    await userModel.insertMany(users);
    return res.json(req.file);
}
export const confirmEmail = async (req, res) => {
const token = req.params.token;
const decoded=jwt.verify(token,process.env.CONFIRM_EMAILTOKEN);
await  userModel.findOneAndUpdate({email:decoded.email},{confirmeEmail:true});
return res.status(200).json({message:"success"});
}
export const login = async (req, res) => {
    const { email,password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "invalid data" });
    }
    if(!user.confirmeEmail){
        {
            return res.status(400).json({ message: "plz confirm your email" });
        }
    }
    const match = bcrypt.compare(password, user.password);
    if (user.status =="NotActive"){
        return res.status(400).json({ message: "your account is blocked" });
    }
    if (!match) {
        return res.status(400).json({ message: "invalid data" });
    }
    const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG);
    return res.status(200).json({ message: "success", token });
}
export const sendCode =async (req, res) => {
    const { email } = req.body;
    const code =customAlphabet('0123456789', 4)();
    const user =await userModel.findOneAndUpdate({ email },{sendCode:code},{new:true});
    if (!user) {
        return res.status(404).json({ message: "email not found" });
    }
    await sendEmail(email, `reset password`,`<h2> code is ${code}</h2>`);
    return res.status(200).json({message: "success"});
}
export const forgotPassword = async (req, res) => {
    const { email, code, password } = req.body;
    const user =await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "email not found" });
    }
    if (user.sendCode != code) {
        return res.status(400).json({ message: "invalid code" });
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    user.sendCode = null;
    await user.save();
    return res.status(200).json({ message: "success"});
}