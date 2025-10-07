import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CategoryService } from '../categories/categories.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { defaultProducts } from './schemas/seed-data';

@Injectable()
export class ProductsService implements OnModuleInit {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        private readonly categoryService: CategoryService
    ) {}

    /**
     * createFlexibleSearchQuery, function que crea una query flexible para búsqueda
     * @param searchTerm string Término de búsqueda
     * @returns object Query object para MongoDB
     */
    private createFlexibleSearchQuery(searchTerm: string): object {
        return {
            $or: [
                // Búsqueda exacta (case insensitive)
                { name: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
                // Búsqueda sin espacios
                { name: { $regex: searchTerm.replace(/\s+/g, ''), $options: 'i' } },
                { category: { $regex: searchTerm.replace(/\s+/g, ''), $options: 'i' } },
                // Búsqueda con caracteres intercambiables para acentos comunes
                {
                    name: {
                        $regex: searchTerm
                            .replace(/[aáàäâ]/gi, '[aáàäâ]')
                            .replace(/[eéèëê]/gi, '[eéèëê]')
                            .replace(/[iíìïî]/gi, '[iíìïî]')
                            .replace(/[oóòöô]/gi, '[oóòöô]')
                            .replace(/[uúùüû]/gi, '[uúùüû]')
                            .replace(/\s+/g, '\\s*'),
                        $options: 'i',
                    },
                },
                {
                    category: {
                        $regex: searchTerm
                            .replace(/[aáàäâ]/gi, '[aáàäâ]')
                            .replace(/[eéèëê]/gi, '[eéèëê]')
                            .replace(/[iíìïî]/gi, '[iíìïî]')
                            .replace(/[oóòöô]/gi, '[oóòöô]')
                            .replace(/[uúùüû]/gi, '[uúùüû]')
                            .replace(/\s+/g, '\\s*'),
                        $options: 'i',
                    },
                },
            ],
        };
    }

    /**
     * onModuleInit,  function para crear la información necesaria para que funcione el aplicativo.
     */
    async onModuleInit(): Promise<void> {
        await this.seedDefaultProducts();
    }

    /**
     * seedDefaultProducts, function que contiene el listado de array de los productos nuevos a crear.
     */
    private async seedDefaultProducts(): Promise<void> {
        const existingProducts = await this.productModel.countDocuments();
        if (existingProducts > 0) {
            return;
        }

        await this.productModel.insertMany(defaultProducts);
    }

    /**
     * findAll, function que retorna el listado de todos los productos.
     * @returns ProductDocument[] Listado de productos
     */
    public async findAll(): Promise<ProductDocument[]> {
        return await this.productModel.find();
    }

    /**
     * findAllPopular, function que retorna el listado de productos populares.
     * @returns ProductDocument[] Listado de productos populares
     */
    public async findAllPopular(): Promise<ProductDocument[]> {
        return await this.productModel.find({ popular: true });
    }

    /**
     * findByCategory, function que retorna el listado de productos por categoría o nombre.
     * @param category string Categoría del producto
     * @param search string Término de búsqueda para nombre o categoría
     * @returns ProductDocument[] Listado de productos por categoría o nombre
     */
    public async findByCategory(category: string, search?: string): Promise<ProductDocument[]> {
        // Si la categoría es "todas" o "todos", buscar en todos los productos
        if (category.toLowerCase() === 'todas' || category.toLowerCase() === 'todos') {
            if (search) {
                // Usar búsqueda flexible para "todas las categorías"
                return await this.productModel.find(this.createFlexibleSearchQuery(search));
            }
            return await this.findAll();
        }

        // Construir query base para la categoría específica
        let query: FilterQuery<ProductDocument> = { category };

        // Si hay término de búsqueda, agregar filtros adicionales con búsqueda flexible
        if (search) {
            const flexibleSearchQuery = this.createFlexibleSearchQuery(search);
            query = {
                $and: [{ category }, flexibleSearchQuery],
            };
        }

        // Buscar productos con la query construida
        let data = await this.productModel.find(query);

        // Si no hay resultados y NO hay término de búsqueda,
        // intentar buscar en subcategorías
        if (data.length === 0 && !search) {
            const nameCategory = await this.categoryService.findCategoryByName(category);
            if (!nameCategory) {
                return [];
            }

            const categories = await this.categoryService.findByParentId(
                nameCategory._id.toString()
            );

            if (categories && categories.length > 0) {
                data = await this.productModel.find({
                    category: { $in: categories.map(c => c.name) },
                });
            }
        }

        // Si no hay resultados y SÍ hay término de búsqueda,
        // buscar en subcategorías con el término de búsqueda flexible
        if (data.length === 0 && search) {
            const nameCategory = await this.categoryService.findCategoryByName(category);
            if (nameCategory) {
                const categories = await this.categoryService.findByParentId(
                    nameCategory._id.toString()
                );

                if (categories && categories.length > 0) {
                    const categoryNames = categories.map(c => c.name);
                    const flexibleSearchQuery = this.createFlexibleSearchQuery(search);
                    data = await this.productModel.find({
                        $and: [{ category: { $in: categoryNames } }, flexibleSearchQuery],
                    });
                }
            }
        }

        return data;
    }

    /**
     * findAllDiscounted, function que retorna el listado de productos con descuento.
     * @returns ProductDocument[] Listado de productos con descuento
     */
    public async findAllDiscounted(): Promise<ProductDocument[]> {
        const data = await this.productModel.find({ discount: { $gt: 0 } });
        return data;
    }

    /**
     * findNewProduct, function que retorna el listado de productos marcados como nuevos.
     * @returns ProductDocument[] Listado de productos nuevos
     */
    public async findNewProduct(): Promise<ProductDocument[]> {
        const data = await this.productModel.find({ nuevo: true });
        return data;
    }
}
