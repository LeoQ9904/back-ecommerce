import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class AddressDto {
    @ApiProperty({
        description: 'Calle de la dirección',
        example: 'Calle 123 #45-67',
    })
    @IsString()
    street: string;

    @ApiProperty({
        description: 'Ciudad',
        example: 'Bogotá',
    })
    @IsString()
    city: string;

    @ApiProperty({
        description: 'Estado o departamento',
        example: 'Cundinamarca',
    })
    @IsString()
    state: string;

    @ApiProperty({
        description: 'Código postal',
        example: '110111',
    })
    @IsString()
    zipCode: string;

    @ApiProperty({
        description: 'País',
        example: 'Colombia',
    })
    @IsString()
    country: string;

    @ApiPropertyOptional({
        description: 'Marcar como dirección por defecto',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}

export class CreateCustomerDto {
    @ApiProperty({
        description: 'UID de Firebase',
        example: 'firebase-uid-123',
    })
    @IsString()
    firebaseUid: string;

    @ApiProperty({
        description: 'Email del cliente',
        example: 'cliente@example.com',
    })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({
        description: 'Nombre del cliente',
        example: 'Juan Pérez',
    })
    @IsOptional()
    @IsString()
    displayName?: string;

    @ApiPropertyOptional({
        description: 'Número de teléfono',
        example: '+57 300 123 4567',
    })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiPropertyOptional({
        description: 'URL de la foto de perfil',
        example: 'https://example.com/photo.jpg',
    })
    @IsOptional()
    @IsString()
    photoURL?: string;

    @ApiPropertyOptional({
        description: 'Direcciones del cliente',
        type: [AddressDto],
        example: [
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
    })
    @IsOptional()
    @Type(() => AddressDto)
    addresses?: AddressDto[];

    @ApiPropertyOptional({
        description: 'Estado activo del cliente',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
