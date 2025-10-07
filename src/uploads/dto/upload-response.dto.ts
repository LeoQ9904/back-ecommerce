import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
    @ApiProperty({
        description: 'Ruta con nombre como se almacena la imagen.',
        example: '/uploads/image-1759783905475-56170581.jpg',
    })
    path: string;
}
