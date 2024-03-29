import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import  Jwt  from "jsonwebtoken";


// registeration router
export const registerController =async (req,res) => {
    try {
        const {name, email,password,phone, address} =req.body;

        // validation
        if(!name){
            return res.send({error:"name is require"})
        }

        if(!email){
            return res.send({error:"email is require"})
        }

        if(!password){
            return res.send({error:"password is require"})
        }

        if(!phone){
            return res.send({error:"phone no is require"})
        }

        if(!address){
            return res.send({error:"address is require"})
        }

        // check user
        const existingUser = await userModel.findOne({email});

        // existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'already Register please login'
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        //save

        const user =await new userModel({name, email,phone,address,password:hashedPassword}).save()
        
        res.status(200).send({
            success:true,
            message:"User Register successfully",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registeration',
            error
        })
    }
};

//login router

export const loginController = async(req,res) => {
    try {
        const {email, password} = req.body;

        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                messaage:'Invalid Email or Password'
            })
        }

        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not Register"
            })
        }
        const match =await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password" 
            })
        }

        // token

        const token = await Jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'10d'});
        res.status(200).send({
            success:true,
            messaage:"login successfully",
            user: {
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}




