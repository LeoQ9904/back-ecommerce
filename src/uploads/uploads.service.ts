import { Injectable } from '@nestjs/common';
import { diskStorage, FileFilterCallback, Options } from 'multer';

import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@Injectable()
export class UploadsService {
    private ensureDirectoryExists(dirPath: string): void {
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
        }
    }

    getMulterConfig(): Options {
        const uploadPath = './uploads';
        this.ensureDirectoryExists(uploadPath);

        return {
            storage: diskStorage({
                destination: uploadPath,
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    callback(
                        null,
                        `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`
                    );
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

    uploadImage(file: string): string {
        return `/uploads/${file}`;
    }
}
