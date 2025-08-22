import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            const product = new this.productModel(createProductDto);
            return await product.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('El SKU ya existe');
            }
            throw new BadRequestException('Error al crear el producto');
        }
    }

    async findAll(page: number = 1, limit: number = 10, filters?: any): Promise<{
        products: Product[],
        total: number,
        page: number,
        totalPages: number,
        hasNext: boolean,
        hasPrev: boolean
    }> {
        const skip = (page - 1) * limit;
        const query: FilterQuery<ProductDocument> = { isActive: true };

        // Aplicar filtros adicionales
        if (filters?.category) {
            query.category = new RegExp(filters.category, 'i');
        }
        if (filters?.brand) {
            query.brand = new RegExp(filters.brand, 'i');
        }
        if (filters?.minPrice || filters?.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }
        if (filters?.inStock) {
            query.stock = { $gt: 0 };
        }

        const [products, total] = await Promise.all([
            this.productModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.productModel.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            products,
            total,
            page,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel
            .findOne({ _id: id, isActive: true })
            .lean()
            .exec();
            
        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        
        return product;
    }

    async findBySku(sku: string): Promise<Product> {
        const product = await this.productModel
            .findOne({ sku, isActive: true })
            .lean()
            .exec();
            
        if (!product) {
            throw new NotFoundException(`Producto con SKU ${sku} no encontrado`);
        }
        
        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        try {
            const product = await this.productModel
                .findOneAndUpdate(
                    { _id: id, isActive: true },
                    updateProductDto,
                    { new: true, runValidators: true }
                )
                .lean()
                .exec();

            if (!product) {
                throw new NotFoundException(`Producto con ID ${id} no encontrado`);
            }

            return product;
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('El SKU ya existe');
            }
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Datos de producto inválidos');
            }
            throw error;
        }
    }

    async remove(id: string): Promise<void> {
        const result = await this.productModel
            .findOneAndUpdate(
                { _id: id, isActive: true },
                { isActive: false },
                { new: true }
            )
            .lean()
            .exec();

        if (!result) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
    }

    async hardDelete(id: string): Promise<void> {
        const result = await this.productModel
            .findByIdAndDelete(id)
            .exec();

        if (!result) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
    }

    async search(searchTerm: string, page: number = 1, limit: number = 10): Promise<{
        products: Product[],
        total: number,
        page: number,
        totalPages: number
    }> {
        const skip = (page - 1) * limit;
        
        const searchQuery = {
            isActive: true,
            $or: [
                { name: new RegExp(searchTerm, 'i') },
                { description: new RegExp(searchTerm, 'i') },
                { category: new RegExp(searchTerm, 'i') },
                { brand: new RegExp(searchTerm, 'i') },
                { tags: { $in: [new RegExp(searchTerm, 'i')] } }
            ]
        };

        const [products, total] = await Promise.all([
            this.productModel
                .find(searchQuery)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.productModel.countDocuments(searchQuery)
        ]);

        return {
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
        return this.productModel
            .find({
                isActive: true,
                stock: { $lte: threshold, $gt: 0 }
            })
            .sort({ stock: 1 })
            .lean()
            .exec();
    }

    async getOutOfStockProducts(): Promise<Product[]> {
        return this.productModel
            .find({
                isActive: true,
                stock: 0
            })
            .sort({ updatedAt: -1 })
            .lean()
            .exec();
    }

    async updateStock(id: string, quantity: number, operation: 'add' | 'subtract' | 'set' = 'set'): Promise<Product> {
        let updateQuery: any;

        switch (operation) {
            case 'add':
                updateQuery = { $inc: { stock: Math.abs(quantity) } };
                break;
            case 'subtract':
                updateQuery = { $inc: { stock: -Math.abs(quantity) } };
                break;
            case 'set':
            default:
                updateQuery = { stock: quantity };
                break;
        }

        const product = await this.productModel
            .findOneAndUpdate(
                { _id: id, isActive: true },
                updateQuery,
                { new: true, runValidators: true }
            )
            .lean()
            .exec();

        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        if (product.stock < 0) {
            throw new BadRequestException('No se puede tener stock negativo');
        }

        return product;
    }

    async getStatistics() {
        const pipeline = [
            { $match: { isActive: true } },
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } },
                    averagePrice: { $avg: '$price' },
                    totalStock: { $sum: '$stock' },
                    maxPrice: { $max: '$price' },
                    minPrice: { $min: '$price' }
                }
            }
        ];

        const [stats] = await this.productModel.aggregate(pipeline);
        
        const [categories, brands, lowStockCount, outOfStockCount] = await Promise.all([
            this.productModel.distinct('category', { isActive: true }),
            this.productModel.distinct('brand', { isActive: true }),
            this.productModel.countDocuments({ isActive: true, stock: { $lte: 10, $gt: 0 } }),
            this.productModel.countDocuments({ isActive: true, stock: 0 })
        ]);

        return {
            totalProducts: stats?.totalProducts || 0,
            totalValue: stats?.totalValue || 0,
            averagePrice: stats?.averagePrice || 0,
            totalStock: stats?.totalStock || 0,
            maxPrice: stats?.maxPrice || 0,
            minPrice: stats?.minPrice || 0,
            categories: categories.length,
            categoryList: categories,
            brands: brands.length,
            brandList: brands,
            lowStockProducts: lowStockCount,
            outOfStockProducts: outOfStockCount
        };
    }

    async getTopProducts(limit: number = 10): Promise<Product[]> {
        return this.productModel
            .find({ isActive: true })
            .sort({ rating: -1, reviewCount: -1 })
            .limit(limit)
            .lean()
            .exec();
    }

    async getProductsByCategory(category: string, page: number = 1, limit: number = 10): Promise<{
        products: Product[],
        total: number,
        page: number,
        totalPages: number
    }> {
        const skip = (page - 1) * limit;
        const query = { isActive: true, category: new RegExp(category, 'i') };

        const [products, total] = await Promise.all([
            this.productModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.productModel.countDocuments(query)
        ]);

        return {
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    async getProductsByPriceRange(minPrice: number, maxPrice: number, page: number = 1, limit: number = 10): Promise<{
        products: Product[],
        total: number,
        page: number,
        totalPages: number
    }> {
        const skip = (page - 1) * limit;
        const query = {
            isActive: true,
            price: { $gte: minPrice, $lte: maxPrice }
        };

        const [products, total] = await Promise.all([
            this.productModel
                .find(query)
                .sort({ price: 1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.productModel.countDocuments(query)
        ]);

        return {
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }
}
