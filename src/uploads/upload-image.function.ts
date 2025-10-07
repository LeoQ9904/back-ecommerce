import { diskStorage, FileFilterCallback, Options } from 'multer';
import { extname } from 'path';

export function uploadImageConfig(): Options {
    return {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
        fileFilter: (req, file: Express.Multer.File, callback: FileFilterCallback): void => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(null, false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    };
}

export function getImagePath(file: string): string {
    return `/uploads/${file}`;
}
