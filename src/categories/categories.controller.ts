import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { CategoryService } from './categories.service';
import { Category } from './schemas/category.schema';

@ApiTags('Categories')
@Controller('categories')
@UseInterceptors(ResponseInterceptor)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}
