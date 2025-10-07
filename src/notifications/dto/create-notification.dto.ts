import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Min,
} from 'class-validator';
import { NotificationStatus } from '../schemas/notification.schema';

export class CreateNotificationDto {
    @ApiProperty({
        description: 'Título de la notificación',
        example: 'Nueva promoción disponible',
        minLength: 1,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Descripción detallada de la notificación',
        example: 'Descuento del 20% en todos los productos de electrónicos durante esta semana',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen de fondo de la notificación',
        example: 'https://example.com/background-image.jpg',
    })
    @IsOptional()
    @IsUrl()
    backgroundImage?: string;

    @ApiPropertyOptional({
        description: 'Estado de la notificación',
        enum: NotificationStatus,
        example: NotificationStatus.ACTIVE,
    })
    @IsOptional()
    @IsEnum(NotificationStatus)
    status?: NotificationStatus;

    @ApiPropertyOptional({
        description: 'Indica si la notificación es visible para los usuarios',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isVisible?: boolean;

    @ApiPropertyOptional({
        description: 'Fecha de expiración de la notificación (ISO 8601)',
        example: '2024-12-31T23:59:59.000Z',
    })
    @IsOptional()
    @IsDateString()
    expirationDate?: string;

    @ApiPropertyOptional({
        description: 'Prioridad de la notificación (mayor número = mayor prioridad)',
        example: 1,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    priority?: number;
}
