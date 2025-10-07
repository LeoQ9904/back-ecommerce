import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Category, CategoryDocument } from './schemas/category.schema';
import { dataPrincipalCategories, dataSubCategories } from './schemas/seed-data';

@Injectable()
export class CategoryService implements OnModuleInit {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
    ) {}

    /**
     * onModuleInit,  function para crear la información necesaria para que funcione el aplicativo.
     */
    async onModuleInit(): Promise<void> {
        await this.seedDefaultCategories();
    }

    /**
     * seedDefaultCategories, function que contiene el listado de array de las categorías nuevas a crear.
     */
    private async seedDefaultCategories(): Promise<void> {
        const existingCategories = await this.categoryModel.countDocuments();
        if (existingCategories === 0) {
            // 1. Crear categorías principales
            const principalCategories =
                await this.categoryModel.insertMany(dataPrincipalCategories);

            // 2. Obtener IDs de categorías principales
            const categoryMap: Record<string, Types.ObjectId> = {};
            principalCategories.forEach(cat => {
                categoryMap[cat.name] = cat._id;
            });

            const subcategories = dataSubCategories.map(item => {
                const parentId = categoryMap[item.parentId];
                return { ...item, parentId };
            });

            await this.categoryModel.insertMany(subcategories);
        }
    }

    /**
     * findAll, function que retorna el listado de todas las categorías.
     * @returns Category[] Listado de categorías
     */
    public async findAll(): Promise<Category[]> {
        return await this.categoryModel.find();
    }

    /**
     * findByParentId, function que retorna el listado de subcategorías por categoría padre.
     * @param parentId string ID de la categoría padre
     * @returns Category[] Listado de subcategorías
     */
    public async findByParentId(parentId: string): Promise<Category[]> {
        const objectId = new Types.ObjectId(parentId);
        const result = await this.categoryModel.find({ parentId: objectId }).lean();
        return result;
    }

    /**
     * findCategoryByName, function que retorna una categoría por su nombre.
     * @param name string Nombre de la categoría
     * @returns Category | null Categoría encontrada o null
     */
    public async findCategoryByName(name: string): Promise<Category | null> {
        const result = await this.categoryModel.findOne({ name }).lean();
        return result;
    }
}
