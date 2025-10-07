import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationStatus } from './schemas/notification.schema';

const mockNotificationDocument = {
    _id: '60d0fe4f5311236168a109ca',
    title: 'Test Notification',
    description: 'Test Description',
    status: NotificationStatus.ACTIVE,
    isVisible: true,
    priority: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockNotificationsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findActive: jest.fn(),
    findByStatus: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    toggleVisibility: jest.fn(),
    archiveExpired: jest.fn(),
    search: jest.fn(),
};

describe('NotificationsController', () => {
    let controller: NotificationsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NotificationsController],
            providers: [
                {
                    provide: NotificationsService,
                    useValue: mockNotificationsService,
                },
            ],
        }).compile();

        controller = module.get<NotificationsController>(NotificationsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a notification', async () => {
            const createDto: CreateNotificationDto = {
                title: 'Test Notification',
                description: 'Test Description',
            };

            mockNotificationsService.create.mockResolvedValue(mockNotificationDocument);

            const result = await controller.create(createDto);

            expect(mockNotificationsService.create).toHaveBeenCalledWith(createDto);
            expect(result).toBeDefined();
            expect(result.title).toEqual('Test Notification');
        });
    });

    describe('findAll', () => {
        it('should return an array of notifications', async () => {
            const notifications = [mockNotificationDocument];
            mockNotificationsService.findAll.mockResolvedValue(notifications);

            const result = await controller.findAll();

            expect(mockNotificationsService.findAll).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].title).toEqual('Test Notification');
        });
    });

    describe('findOne', () => {
        it('should return a notification', async () => {
            mockNotificationsService.findOne.mockResolvedValue(mockNotificationDocument);

            const result = await controller.findOne('60d0fe4f5311236168a109ca');

            expect(mockNotificationsService.findOne).toHaveBeenCalledWith(
                '60d0fe4f5311236168a109ca'
            );
            expect(result.title).toEqual('Test Notification');
        });
    });

    describe('update', () => {
        it('should update a notification', async () => {
            const updateDto: UpdateNotificationDto = { title: 'Updated Title' };
            const updatedNotification = { ...mockNotificationDocument, title: 'Updated Title' };

            mockNotificationsService.update.mockResolvedValue(updatedNotification);

            const result = await controller.update('60d0fe4f5311236168a109ca', updateDto);

            expect(mockNotificationsService.update).toHaveBeenCalledWith(
                '60d0fe4f5311236168a109ca',
                updateDto
            );
            expect(result.title).toEqual('Updated Title');
        });
    });

    describe('remove', () => {
        it('should remove a notification', async () => {
            mockNotificationsService.remove.mockResolvedValue(undefined);

            await controller.remove('60d0fe4f5311236168a109ca');

            expect(mockNotificationsService.remove).toHaveBeenCalledWith(
                '60d0fe4f5311236168a109ca'
            );
        });
    });

    describe('toggleVisibility', () => {
        it('should toggle notification visibility', async () => {
            const toggledNotification = { ...mockNotificationDocument, isVisible: false };
            mockNotificationsService.toggleVisibility.mockResolvedValue(toggledNotification);

            const result = await controller.toggleVisibility('60d0fe4f5311236168a109ca');

            expect(mockNotificationsService.toggleVisibility).toHaveBeenCalledWith(
                '60d0fe4f5311236168a109ca'
            );
            expect(result.isVisible).toBe(false);
        });
    });

    describe('archiveExpired', () => {
        it('should archive expired notifications', async () => {
            mockNotificationsService.archiveExpired.mockResolvedValue(3);

            const result = await controller.archiveExpired();

            expect(mockNotificationsService.archiveExpired).toHaveBeenCalled();
            expect(result.archivedCount).toBe(3);
        });
    });
});
