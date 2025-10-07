import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
    Notification,
    NotificationDocument,
    NotificationStatus,
} from './schemas/notification.schema';
import { defaultNotifications } from './schemas/seed-data';

@Injectable()
export class NotificationsService implements OnModuleInit {
    constructor(
        @InjectModel(Notification.name)
        private readonly notificationModel: Model<NotificationDocument>
    ) {}

    /**
     * onModuleInit, function para crear las notificaciones por defecto
     */
    async onModuleInit(): Promise<void> {
        await this.seedDefaultNotifications();
    }

    /**
     * seedDefaultNotifications, function que contiene el listado de notificaciones por defecto
     */
    private async seedDefaultNotifications(): Promise<void> {
        const existingNotifications = await this.notificationModel.countDocuments();
        if (existingNotifications > 0) {
            return;
        }

        await this.notificationModel.insertMany(defaultNotifications);
    }

    /**
     * create, function que crea una nueva notificación
     * @param createNotificationDto CreateNotificationDto Datos para crear la notificación
     * @returns Promise<NotificationDocument> Notificación creada
     */
    async create(createNotificationDto: CreateNotificationDto): Promise<NotificationDocument> {
        const notification = new this.notificationModel(createNotificationDto);
        return await notification.save();
    }

    /**
     * findAll, function que retorna todas las notificaciones
     * @returns Promise<NotificationDocument[]> Listado de todas las notificaciones
     */
    async findAll(): Promise<NotificationDocument[]> {
        return await this.notificationModel.find().sort({ priority: -1, createdAt: -1 });
    }

    /**
     * findActive, function que retorna las notificaciones activas y visibles
     * @returns Promise<NotificationDocument[]> Listado de notificaciones activas
     */
    async findActive(): Promise<NotificationDocument[]> {
        const now = new Date();
        return await this.notificationModel
            .find({
                status: NotificationStatus.ACTIVE,
                isVisible: true,
                $or: [{ expirationDate: { $gt: now } }, { expirationDate: { $exists: false } }],
            })
            .sort({ priority: -1, createdAt: -1 });
    }

    /**
     * findByStatus, function que retorna notificaciones por estado
     * @param status NotificationStatus Estado de las notificaciones a buscar
     * @returns Promise<NotificationDocument[]> Listado de notificaciones por estado
     */
    async findByStatus(status: NotificationStatus): Promise<NotificationDocument[]> {
        return await this.notificationModel.find({ status }).sort({ priority: -1, createdAt: -1 });
    }

    /**
     * findOne, function que retorna una notificación por ID
     * @param id string ID de la notificación
     * @returns Promise<NotificationDocument> Notificación encontrada
     */
    async findOne(id: string): Promise<NotificationDocument> {
        const notification = await this.notificationModel.findById(id);
        if (!notification) {
            throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
        }
        return notification;
    }

    /**
     * update, function que actualiza una notificación
     * @param id string ID de la notificación a actualizar
     * @param updateNotificationDto UpdateNotificationDto Datos para actualizar
     * @returns Promise<NotificationDocument> Notificación actualizada
     */
    async update(
        id: string,
        updateNotificationDto: UpdateNotificationDto
    ): Promise<NotificationDocument> {
        const notification = await this.notificationModel.findByIdAndUpdate(
            id,
            updateNotificationDto,
            { new: true }
        );

        if (!notification) {
            throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
        }

        return notification;
    }

    /**
     * remove, function que elimina una notificación
     * @param id string ID de la notificación a eliminar
     * @returns Promise<void>
     */
    async remove(id: string): Promise<void> {
        const result = await this.notificationModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
        }
    }

    /**
     * toggleVisibility, function que cambia la visibilidad de una notificación
     * @param id string ID de la notificación
     * @returns Promise<NotificationDocument> Notificación actualizada
     */
    async toggleVisibility(id: string): Promise<NotificationDocument> {
        const notification = await this.findOne(id);
        return await this.update(id, { isVisible: !notification.isVisible });
    }

    /**
     * archiveExpired, function que archiva notificaciones expiradas
     * @returns Promise<number> Número de notificaciones archivadas
     */
    async archiveExpired(): Promise<number> {
        const now = new Date();
        const result = await this.notificationModel.updateMany(
            {
                expirationDate: { $lt: now },
                status: { $ne: NotificationStatus.ARCHIVED },
            },
            { status: NotificationStatus.ARCHIVED }
        );

        return result.modifiedCount;
    }

    /**
     * search, function que busca notificaciones por título o descripción
     * @param searchTerm string Término de búsqueda
     * @returns Promise<NotificationDocument[]> Notificaciones encontradas
     */
    async search(searchTerm: string): Promise<NotificationDocument[]> {
        return await this.notificationModel
            .find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                ],
            })
            .sort({ priority: -1, createdAt: -1 });
    }
}
