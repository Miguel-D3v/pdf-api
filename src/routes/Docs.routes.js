import express from "express";
import { convertDocsController} from "../controllers/convertDocs.js";
import { upload } from '../middlewares/upload.js';


const router = express.Router();

router.post("/convert-docs",
              upload.array('files',5),
              convertDocsController
            );

export default router;