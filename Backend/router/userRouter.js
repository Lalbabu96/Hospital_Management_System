import express from "express";
import { addDoctor, addNewAdmin, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAutheticated,isPatientAutheticated } from "../middleWares/auth.js";

const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addNew",isAdminAutheticated,addNewAdmin);
router.get("/doctors",getAllDoctors);
router.get("/admin/me" ,isAdminAutheticated, getUserDetails);
router.get("/patient/me" ,isPatientAutheticated, getUserDetails);
router.get("/admin/logout" ,isAdminAutheticated, logoutAdmin);
router.get("/patient/logout" ,isPatientAutheticated, logoutPatient);
router.post("/doctor/addNew" ,isAdminAutheticated, addDoctor);

export default router;
