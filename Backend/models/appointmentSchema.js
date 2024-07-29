import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain At Least 3 Charecter!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Must Contain At Least 3 Charecter!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail, "Please Provide Valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10, "Phone Number Must Contain Exact 10 Digit"],
        maxLength:[10, "Phone Number Must Contain Exact 10 Digit"],
    },
    nic:{
        type:String,
        required :true,
        minLength:[13, "NIC  Must Contain Exact 13 Digit"],
        maxLength:[13, "NIC  Must Contain Exact 13 Digit"],
    },
    DOB:{
        type:Date,
        required:[true, "DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    appointment_date:{
        type : String,
        required:true,
    },
    deparment:{
        type :String,
        required:true,
    },
    doctor:{
        firstName:{
            type :String,
            required:true,
        },
        lastName:{
            type : String,
            required : true,
        }
    },
    hasVisited:{
        type :Boolean,
        default:false,
    },
    doctorID:{
        type : mongoose.Schema.ObjectId,
        required:true,
    },
    patientID:{
        type : mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type :String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    },

});

export const Appointment =mongoose.model("Appointment",appointmentSchema);