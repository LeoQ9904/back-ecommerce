import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationDocument, NotificationStatus } from '../schemas/notification.schema';

export class NotificationResponseDto {
    @ApiProperty({
        description: 'ID único de la notificación',
        example: '60d0fe4f5311236168a109ca',
    })
    id: string;

    @ApiProperty({
        description: 'Título de la notificación',
        example: 'Nueva promoción disponible',
    })
    title: string;

    @ApiProperty({
        description: 'Descripción de la notificación',
        example: 'Descuento del 20% en todos los productos de electrónicos durante esta semana',
    })
    description: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen de fondo',
        example: 'https://example.com/background-image.jpg',
    })
    backgroundImage?: string;

    @ApiProperty({
        description: 'Estado de la notificación',
        enum: NotificationStatus,
        example: NotificationStatus.ACTIVE,
    })
    status: NotificationStatus;

    @ApiProperty({
        description: 'Indica si la notificación es visible',
        example: true,
    })
    isVisible: boolean;

    @ApiPropertyOptional({
        description: 'Fecha de expiración',
        example: '2024-12-31T23:59:59.000Z',
    })
    expirationDate?: Date;

    @ApiProperty({
        description: 'Prioridad de la notificación',
        example: 1,
    })
    priority: number;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2024-01-15T10:30:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización',
        example: '2024-01-16T14:20:00.000Z',
    })
    updatedAt: Date;

    constructor(notification: NotificationDocument) {
        this.id = String(notification._id);
        this.title = notification.title;
        this.description = notification.description;
        this.backgroundImage = notification.backgroundImage;
        this.status = notification.status;
        this.isVisible = notification.isVisible;
        this.expirationDate = notification.expirationDate;
        this.priority = notification.priority;
        this.createdAt = (notification as unknown as { createdAt: Date }).createdAt;
        this.updatedAt = (notification as unknown as { updatedAt: Date }).updatedAt;
    }
}
