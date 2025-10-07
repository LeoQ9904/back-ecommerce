import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { env } from '../config/env';
import { UploadsService } from '../uploads/uploads.service';
import { CustomersService } from './customers.service';
import { AddressDto, CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@Controller('customers')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ResponseInterceptor)
export class CustomersController {
    constructor(
        private readonly customersService: CustomersService,
        private readonly uploadsService: UploadsService
    ) {}

    @Post()
    @ApiOperation({
        summary: 'Crear o encontrar cliente por Firebase UID',
        description:
            'Crea un nuevo cliente o retorna uno existente. Soporta múltiples direcciones con una marcada como predeterminada.',
    })
    @ApiBody({
        type: CreateCustomerDto,
        examples: {
            'cliente-con-direcciones': {
                summary: 'Cliente con múltiples direcciones',
                description:
                    'Ejemplo de cliente con dos direcciones, una marcada como predeterminada',
                value: {
                    firebaseUid: 'firebase-uid-123',
                    email: 'cliente@example.com',
                    displayName: 'Juan Pérez',
                    phoneNumber: '+57 300 123 4567',
                    addresses: [
                        {
                            street: 'Calle 123 #45-67',
                            city: 'Bogotá',
                            state: 'Cundinamarca',
                            zipCode: '110111',
                            country: 'Colombia',
                            isDefault: true,
                        },
                        {
                            street: 'Carrera 45 #12-34',
                            city: 'Medellín',
                            state: 'Antioquia',
                            zipCode: '050001',
                            country: 'Colombia',
                            isDefault: false,
                        },
                    ],
                },
            },
        },
    })
    async findOrCreate(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return new CustomerResponseDto(await this.customersService.findOrCreate(createCustomerDto));
    }

    @Get('firebase/:uid')
    @ApiOperation({ summary: 'Obtener cliente por Firebase UID' })
    async findByFirebaseUid(@Param('uid') firebaseUid: string): Promise<CustomerResponseDto> {
        return new CustomerResponseDto(await this.customersService.findByFirebaseUid(firebaseUid));
    }

    @Put('firebase/:uid')
    @ApiOperation({
        summary: 'Actualizar cliente por Firebase UID',
        description:
            'Actualiza los datos del cliente incluyendo direcciones. Si se envían direcciones, se asegura que una esté marcada como predeterminada.',
    })
    @UseInterceptors(FileInterceptor('image', new UploadsService().getMulterConfig()))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            allOf: [
                { $ref: getSchemaPath(UpdateCustomerDto) },
                {
                    type: 'object',
                    properties: {
                        image: {
                            type: 'string',
                            format: 'binary',
                            description: 'Imagen de perfil (opcional)',
                        },
                    },
                },
            ],
        },
        examples: {
            'actualizar-direcciones': {
                summary: 'Actualizar direcciones del cliente',
                description: 'Ejemplo de actualización con nuevas direcciones',
                value: {
                    displayName: 'Juan Pérez Actualizado',
                    addresses: [
                        {
                            street: 'Nueva Calle 456 #78-90',
                            city: 'Cali',
                            state: 'Valle del Cauca',
                            zipCode: '760001',
                            country: 'Colombia',
                            isDefault: true,
                        },
                    ],
                },
            },
        },
    })
    async updateByFirebaseUid(
        @Param('uid') firebaseUid: string,
        @Body() updateData: UpdateCustomerDto,
        @UploadedFile() file?: Express.Multer.File
    ): Promise<CustomerResponseDto> {
        if (file) {
            const imagePath = this.uploadsService.uploadImage(file.filename);
            updateData.photoURL = env.DOMINIO_API + imagePath;
        }
        if (updateData.addresses && typeof updateData.addresses === 'string') {
            updateData.addresses = JSON.parse(updateData.addresses as string) as AddressDto[];
        }

        return new CustomerResponseDto(
            await this.customersService.updateByFirebaseUid(firebaseUid, updateData)
        );
    }
}
