import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { Notification, NotificationStatus } from './schemas/notification.schema';

const mockNotification = {
    _id: '60d0fe4f5311236168a109ca',
    title: 'Test Notification',
    description: 'Test Description',
    status: NotificationStatus.ACTIVE,
    isVisible: true,
    priority: 1,
    save: jest.fn(),
};

const mockNotificationModel = {
    new: jest.fn().mockResolvedValue(mockNotification),
    constructor: jest.fn().mockResolvedValue(mockNotification),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    updateMany: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
};

describe('NotificationsService', () => {
    let service: NotificationsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationsService,
                {
                    provide: getModelToken(Notification.name),
                    useValue: mockNotificationModel,
                },
            ],
        }).compile();

        service = module.get<NotificationsService>(NotificationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of notifications', async () => {
            const notifications = [mockNotification];
            mockNotificationModel.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue(notifications),
            });

            const result = await service.findAll();
            expect(result).toEqual(notifications);
            expect(mockNotificationModel.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a notification', async () => {
            mockNotificationModel.findById.mockResolvedValue(mockNotification);

            const result = await service.findOne('60d0fe4f5311236168a109ca');
            expect(result).toEqual(mockNotification);
            expect(mockNotificationModel.findById).toHaveBeenCalledWith('60d0fe4f5311236168a109ca');
        });

        it('should throw NotFoundException if notification not found', async () => {
            mockNotificationModel.findById.mockResolvedValue(null);

            await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update and return a notification', async () => {
            const updateDto = { title: 'Updated Title' };
            mockNotificationModel.findByIdAndUpdate.mockResolvedValue({
                ...mockNotification,
                ...updateDto,
            });

            const result = await service.update('60d0fe4f5311236168a109ca', updateDto);
            expect(result.title).toEqual('Updated Title');
            expect(mockNotificationModel.findByIdAndUpdate).toHaveBeenCalledWith(
                '60d0fe4f5311236168a109ca',
                updateDto,
                { new: true }
            );
        });

        it('should throw NotFoundException if notification not found', async () => {
            mockNotificationModel.findByIdAndUpdate.mockResolvedValue(null);

            await expect(service.update('nonexistent', {})).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a notification', async () => {
            mockNotificationModel.findByIdAndDelete.mockResolvedValue(mockNotification);

            await service.remove('60d0fe4f5311236168a109ca');
            expect(mockNotificationModel.findByIdAndDelete).toHaveBeenCalledWith(
                '60d0fe4f5311236168a109ca'
            );
        });

        it('should throw NotFoundException if notification not found', async () => {
            mockNotificationModel.findByIdAndDelete.mockResolvedValue(null);

            await expect(service.remove('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });
});
