import express from "express";
import { deleteAppointment, getAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isAdminAutheticated,isPatientAutheticated} from "../middleWares/auth.js"

const router = express.Router();

router.post("/post",isPatientAutheticated,postAppointment);
router.get("/getall",isAdminAutheticated,getAppointments);
router.put("/update/:id",isAdminAutheticated,updateAppointmentStatus);
router.delete("/delete/:id",isAdminAutheticated,deleteAppointment);

export default router;