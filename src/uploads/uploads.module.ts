import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { uploadImageConfig } from './upload-image.function';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
    imports: [MulterModule.register(uploadImageConfig())],
    controllers: [UploadsController],
    providers: [UploadsService],
    exports: [UploadsService],
})
export class UploadsModule {}
