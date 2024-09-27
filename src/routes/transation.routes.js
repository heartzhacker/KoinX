import { Router } from "express";
import { uploadCSV, getBalance } from "../controllers/transaction.controller.js";
import { upload } from "../utils/multer.js";

const router = Router();


router.route("/uploadcsv").post(upload.single('file'), uploadCSV);

router.route("/get-balance").post(getBalance);



export default router;
