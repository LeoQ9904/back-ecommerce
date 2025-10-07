import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { UploadResponseDto } from './dto/upload-response.dto';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@Controller('uploads')
@UseInterceptors(ResponseInterceptor)
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({ summary: 'Subir imagen' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Imagen subida correctamente',
        schema: {
            type: 'object',
            properties: {
                path: {
                    type: 'string',
                    example: '/uploads/image-1234567890-123456789.jpg',
                },
            },
        },
    })
    uploadImage(@UploadedFile() file: Express.Multer.File): UploadResponseDto {
        if (!file) {
            throw new BadRequestException('No se ha proporcionado ningún archivo');
        }
        const imagePath = this.uploadsService.uploadImage(file.filename);
        return { path: imagePath };
    }
}
