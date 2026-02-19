import { Router } from 'express';
import { upload } from '../middlewares/upload.js';
import { convertController } from '../controllers/convertImage.js';

const router = Router();

router.post('/convert',
            upload.array('files',5),
            convertController
        );

export default router;