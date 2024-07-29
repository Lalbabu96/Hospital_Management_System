import {catchAsyncErrors} from "../middleWares/catchSyncError.js";
import ErrorHandler from "../middleWares/errorMiddleWares.js";
import {Appointment} from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
     const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        DOB,
        gender,
        appointment_date,
        deparment,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address
    }=req.body;

    if(!firstName || !lastName || !email|| !phone || !nic || !DOB || !gender || !appointment_date|| !deparment|| !doctor_firstName || !doctor_lastName || !hasVisited ||!address){
        return next(new ErrorHandler("Please Fill Full Form!",400));
    }

    const isConflict = await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDeparment:deparment,
    });
    if(isConflict.length===0){
        return next(new ErrorHandler("Doctor not found",404));
    }
    if(isConflict.length >1){
        return next(new ErrorHandler("Doctors Confilct Please Contact Through Eamil or Phone! ",404));
    };

    const doctorID =isConflict[0]._id;
    const patientID=req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        DOB,
        gender,
        appointment_date,
        deparment,
        doctor:{
        firstName: doctor_firstName,
        lastName : doctor_lastName,
        },
        hasVisited,
        address,
        doctorID,
        patientID
    });

    res.status(200).json({
        success : true,
        message: "Appointment Sent Successfully",
        appointment,
    });


});

export const getAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find();

    res.status(200).json({
        success:true,
        appointments,
    });
});

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    let appointment =await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",400));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new :true,
        runValidators:true,
        userFindAndModify :false,
    });

    res.status(200).json({
        success:true,
        message:"Appointment Status Updated",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found!"));
    }
    res.status(200).json({
        success:true,
        message:"Appointment is Deleted",

    })
})