import express from "express";
const router = express.Router();
import {
  saveCallIdController,
  getCallIdController,
} from "../Controller/Controller.js";
//saving call id in redis databasae
router.post("/api/save-call-id", saveCallIdController);
//dynamic-id--whatever id we get from frontend will be passed to controller
router.get("/api/get-call-id/:id", getCallIdController);

export default router;
