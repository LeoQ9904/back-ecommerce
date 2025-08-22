import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';

describe('ProductsService', () => {
    let service: ProductsService;
    let model: Model<ProductDocument>;

    const mockProduct = {
        _id: '64f8b9e1234567890abcdef0',
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 50,
        category: 'Electronics',
        isActive: true,
        sku: 'PRD-TEST-001'
    };

    const mockProductModel = {
        new: jest.fn().mockResolvedValue(mockProduct),
        constructor: jest.fn().mockResolvedValue(mockProduct),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        countDocuments: jest.fn(),
        distinct: jest.fn(),
        aggregate: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        exec: jest.fn(),
        lean: jest.fn(),
        sort: jest.fn(),
        skip: jest.fn(),
        limit: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getModelToken(Product.name),
                    useValue: mockProductModel,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        model = module.get<Model<ProductDocument>>(getModelToken(Product.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a product successfully', async () => {
            const createProductDto = {
                name: 'Test Product',
                description: 'Test Description',
                price: 100,
                stock: 50,
                category: 'Electronics',
            };

            const mockSave = jest.fn().mockResolvedValue(mockProduct);
            mockProductModel.save = mockSave;
            
            // Mock the constructor to return an object with save method
            jest.spyOn(model, 'create').mockImplementation(() => ({
                save: mockSave,
            }) as any);

            const result = await service.create(createProductDto);

            expect(result).toEqual(mockProduct);
        });
    });

    describe('findAll', () => {
        it('should return paginated products', async () => {
            const mockProducts = [mockProduct];
            const mockCount = 1;

            mockProductModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockReturnValue({
                            lean: jest.fn().mockReturnValue({
                                exec: jest.fn().mockResolvedValue(mockProducts),
                            }),
                        }),
                    }),
                }),
            });

            mockProductModel.countDocuments.mockResolvedValue(mockCount);

            const result = await service.findAll(1, 10);

            expect(result.products).toEqual(mockProducts);
            expect(result.total).toBe(mockCount);
            expect(result.page).toBe(1);
        });
    });

    describe('findOne', () => {
        it('should return a product by id', async () => {
            mockProductModel.findOne.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(mockProduct),
                }),
            });

            const result = await service.findOne(mockProduct._id);

            expect(result).toEqual(mockProduct);
        });

        it('should throw NotFoundException if product not found', async () => {
            mockProductModel.findOne.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });

            await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const updateDto = { name: 'Updated Product' };
            const updatedProduct = { ...mockProduct, ...updateDto };

            mockProductModel.findOneAndUpdate.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(updatedProduct),
                }),
            });

            const result = await service.update(mockProduct._id, updateDto);

            expect(result).toEqual(updatedProduct);
        });

        it('should throw NotFoundException if product not found', async () => {
            mockProductModel.findOneAndUpdate.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });

            await expect(service.update('nonexistent', {})).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should soft delete a product', async () => {
            mockProductModel.findOneAndUpdate.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(mockProduct),
                }),
            });

            await expect(service.remove(mockProduct._id)).resolves.not.toThrow();
        });

        it('should throw NotFoundException if product not found', async () => {
            mockProductModel.findOneAndUpdate.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });

            await expect(service.remove('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('search', () => {
        it('should search products by term', async () => {
            const mockProducts = [mockProduct];
            const mockCount = 1;

            mockProductModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockReturnValue({
                            lean: jest.fn().mockReturnValue({
                                exec: jest.fn().mockResolvedValue(mockProducts),
                            }),
                        }),
                    }),
                }),
            });

            mockProductModel.countDocuments.mockResolvedValue(mockCount);

            const result = await service.search('test', 1, 10);

            expect(result.products).toEqual(mockProducts);
            expect(result.total).toBe(mockCount);
        });
    });

    describe('getLowStockProducts', () => {
        it('should return products with low stock', async () => {
            const lowStockProducts = [{ ...mockProduct, stock: 5 }];

            mockProductModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockReturnValue({
                        exec: jest.fn().mockResolvedValue(lowStockProducts),
                    }),
                }),
            });

            const result = await service.getLowStockProducts(10);

            expect(result).toEqual(lowStockProducts);
        });
    });
});
