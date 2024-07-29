import {catchAsyncErrors} from "../middleWares/catchSyncError.js";
import ErrorHandler from "../middleWares/errorMiddleWares.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,DOB,nic,role,}=req.body;

    if(!firstName || !lastName || !email|| !phone || !password|| !gender||!DOB || !nic || !role){
        return next(new ErrorHandler("Please fill full form!",400));
    }

    let user =await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Register",400))
    }

    user =await User.create({firstName,lastName,email,phone,password,gender,DOB,nic,role});

    generateToken(user,"user Registered",200,res);
    
});

export const  login =catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}= req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Detail!",400))
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Password Doesn't Matched",400));
    }

    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password and Email",400));
    }

    const isPasswordMatched =await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Please Enter a valid email and password",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with This Role not found",400));
    }
    generateToken(user,"user Login successfully",200,res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,DOB,nic}=req.body;

    if(!firstName || !lastName || !email|| !phone || !password|| !gender||!DOB || !nic){
        return next(new ErrorHandler("Please fill full form!",400));
    }

    const isRegister=await User.findOne({email});
    if(isRegister){
        return next(new ErrorHandler(`${isRegister.role} with This email Already exists`,400));
    }
    
    const admin= await User.create({firstName,lastName,email,phone,password,gender,DOB,nic,role:"Admin",});
    res.status(200).json({
         success:true,
         message:"New Admin Registerd",
    });
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});
    res.status(200).json({
        seccess:true,
        doctors,
    });
})

export const getUserDetails =catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken"," ",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message:"Admin Logged Out successfully",
    })
})

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken"," ",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message:"Patient Logged Out successfully",
    });
});

export const addDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length ===0){
        return next(new ErrorHandler("Doctor Avatar Required",400));
    }
    const {docAvatar} =req.files;
    const allowedFormats =["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format Not Supported!",400));
    }

    const {firstName,lastName,email,phone,password,gender,DOB,nic,doctorDeparment}= req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !DOB || !nic || !doctorDeparment){
        return next(new ErrorHandler("Please Provide Full Details!" ,400));
    }
   
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered} already registered with this email`,400));
    };

   const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
   if(!cloudinaryResponse || cloudinaryResponse.error){
    console.log("Cloudinary Error :" , cloudinaryResponse.error || "Unknown Cloudinary Error");
   }

   const doctor = await User.create({
      firstName,lastName,email,phone,password,gender,DOB,nic,doctorDeparment,role :"Doctor", docAvatar:{public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url,}
   });

   res.status(200).json({
      success:true,
      message: "New Doctore Registered",
      doctor,
   })
})