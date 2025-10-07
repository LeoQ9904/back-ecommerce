import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';
import { NotificationStatus } from './schemas/notification.schema';

@ApiTags('Notifications')
@Controller('notifications')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ResponseInterceptor)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post()
    @ApiOperation({ summary: 'Crear una nueva notificación' })
    @ApiResponse({
        status: 201,
        description: 'Notificación creada exitosamente',
        type: NotificationResponseDto,
    })
    async create(
        @Body() createNotificationDto: CreateNotificationDto
    ): Promise<NotificationResponseDto> {
        const notification = await this.notificationsService.create(createNotificationDto);
        return new NotificationResponseDto(notification);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las notificaciones' })
    @ApiResponse({
        status: 200,
        description: 'Lista de todas las notificaciones',
        type: [NotificationResponseDto],
    })
    async findAll(): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationsService.findAll();
        return notifications.map(notification => new NotificationResponseDto(notification));
    }

    @Get('active')
    @ApiOperation({ summary: 'Obtener notificaciones activas y visibles' })
    @ApiResponse({
        status: 200,
        description: 'Lista de notificaciones activas',
        type: [NotificationResponseDto],
    })
    async findActive(): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationsService.findActive();
        return notifications.map(notification => new NotificationResponseDto(notification));
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'Obtener notificaciones por estado' })
    @ApiParam({
        name: 'status',
        enum: NotificationStatus,
        description: 'Estado de las notificaciones',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de notificaciones por estado',
        type: [NotificationResponseDto],
    })
    async findByStatus(
        @Param('status') status: NotificationStatus
    ): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationsService.findByStatus(status);
        return notifications.map(notification => new NotificationResponseDto(notification));
    }

    @Get('search')
    @ApiOperation({ summary: 'Buscar notificaciones por título o descripción' })
    @ApiQuery({
        name: 'q',
        description: 'Término de búsqueda',
        example: 'promoción',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de notificaciones encontradas',
        type: [NotificationResponseDto],
    })
    async search(@Query('q') searchTerm: string): Promise<NotificationResponseDto[]> {
        const notifications = await this.notificationsService.search(searchTerm);
        return notifications.map(notification => new NotificationResponseDto(notification));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una notificación por ID' })
    @ApiParam({
        name: 'id',
        description: 'ID de la notificación',
        example: '60d0fe4f5311236168a109ca',
    })
    @ApiResponse({
        status: 200,
        description: 'Notificación encontrada',
        type: NotificationResponseDto,
    })
    async findOne(@Param('id') id: string): Promise<NotificationResponseDto> {
        const notification = await this.notificationsService.findOne(id);
        return new NotificationResponseDto(notification);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una notificación' })
    @ApiParam({
        name: 'id',
        description: 'ID de la notificación',
        example: '60d0fe4f5311236168a109ca',
    })
    @ApiResponse({
        status: 200,
        description: 'Notificación actualizada exitosamente',
        type: NotificationResponseDto,
    })
    async update(
        @Param('id') id: string,
        @Body() updateNotificationDto: UpdateNotificationDto
    ): Promise<NotificationResponseDto> {
        const notification = await this.notificationsService.update(id, updateNotificationDto);
        return new NotificationResponseDto(notification);
    }

    @Patch(':id/toggle-visibility')
    @ApiOperation({ summary: 'Cambiar la visibilidad de una notificación' })
    @ApiParam({
        name: 'id',
        description: 'ID de la notificación',
        example: '60d0fe4f5311236168a109ca',
    })
    @ApiResponse({
        status: 200,
        description: 'Visibilidad de la notificación cambiada exitosamente',
        type: NotificationResponseDto,
    })
    async toggleVisibility(@Param('id') id: string): Promise<NotificationResponseDto> {
        const notification = await this.notificationsService.toggleVisibility(id);
        return new NotificationResponseDto(notification);
    }

    @Post('archive-expired')
    @ApiOperation({ summary: 'Archivar notificaciones expiradas' })
    @ApiResponse({
        status: 200,
        description: 'Número de notificaciones archivadas',
        schema: {
            type: 'object',
            properties: {
                archivedCount: {
                    type: 'number',
                    example: 5,
                },
            },
        },
    })
    @HttpCode(HttpStatus.OK)
    async archiveExpired(): Promise<{ archivedCount: number }> {
        const archivedCount = await this.notificationsService.archiveExpired();
        return { archivedCount };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una notificación' })
    @ApiParam({
        name: 'id',
        description: 'ID de la notificación',
        example: '60d0fe4f5311236168a109ca',
    })
    @ApiResponse({
        status: 204,
        description: 'Notificación eliminada exitosamente',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        await this.notificationsService.remove(id);
    }
}
