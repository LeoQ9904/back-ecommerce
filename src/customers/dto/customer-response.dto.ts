import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address, CustomerDocument } from '../schemas/customer.schema';

export class CustomerResponseDto {
    @ApiProperty({
        description: 'ID único del cliente',
        example: '507f1f77bcf86cd799439011',
    })
    _id: string;

    @ApiProperty({
        description: 'UID de Firebase',
        example: 'firebase-uid-123',
    })
    firebaseUid: string;

    @ApiProperty({
        description: 'Email del cliente',
        example: 'cliente@example.com',
    })
    email: string;

    @ApiPropertyOptional({
        description: 'Nombre del cliente',
        example: 'Juan Pérez',
    })
    displayName?: string;

    @ApiPropertyOptional({
        description: 'Número de teléfono',
        example: '+57 300 123 4567',
    })
    phoneNumber?: string;

    @ApiPropertyOptional({
        description: 'URL de la foto de perfil',
        example: 'https://example.com/photo.jpg',
    })
    photoURL?: string;

    @ApiProperty({
        description: 'Estado activo del cliente',
        example: true,
    })
    isActive: boolean;

    @ApiPropertyOptional({
        description: 'Direcciones del cliente',
        type: [Object],
    })
    addresses?: Address[];

    constructor(customer: CustomerDocument) {
        this._id = String(customer._id);
        this.firebaseUid = customer.firebaseUid;
        this.email = customer.email;
        this.displayName = customer.displayName;
        this.phoneNumber = customer.phoneNumber;
        this.photoURL = customer.photoURL;
        this.isActive = customer.isActive;
        this.addresses = customer.addresses;
    }
}
