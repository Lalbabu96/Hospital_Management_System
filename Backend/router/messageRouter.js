import express from "express";
import { getAllMessage, sendMessage } from "../controller/messageController.js";
import { isAdminAutheticated } from "../middleWares/auth.js";

const router =express.Router();

router.post("/send",sendMessage);
router.get("/getall",isAdminAutheticated,getAllMessage)

export default router;
