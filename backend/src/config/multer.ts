import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
        filename: (req, file, callb) => {
            const hash = crypto.randomBytes(3).toString('hex');
            const fileName = `${hash}-${file.originalname}`;

            callb(null, fileName);
        }
    })
}