import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>
    ) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDocument> {
        const customerData = { ...createCustomerDto };

        if (customerData.addresses?.length) {
            this.ensureOneDefaultAddress(customerData.addresses);
        }

        const customer = new this.customerModel(customerData);
        return await customer.save();
    }

    async findByFirebaseUid(firebaseUid: string): Promise<CustomerDocument> {
        const data = await this.customerModel.findOne({ firebaseUid });
        if (!data) {
            throw new Error('Customer not found');
        }
        return data;
    }

    async findByFirebaseUidOrNull(firebaseUid: string): Promise<CustomerDocument | null> {
        return await this.customerModel.findOne({ firebaseUid });
    }

    async findOrCreate(createCustomerDto: CreateCustomerDto): Promise<CustomerDocument> {
        const existingCustomer = await this.findByFirebaseUidOrNull(createCustomerDto.firebaseUid);

        if (existingCustomer) {
            return existingCustomer;
        }

        return await this.create(createCustomerDto);
    }

    async updateByFirebaseUid(
        firebaseUid: string,
        updateData: Partial<CreateCustomerDto>
    ): Promise<CustomerDocument> {
        if (updateData.addresses?.length) {
            this.ensureOneDefaultAddress(updateData.addresses);
        }

        const data = await this.customerModel.findOneAndUpdate({ firebaseUid }, updateData, {
            new: true,
        });
        if (!data) {
            throw new Error('Customer not found');
        }
        return data;
    }

    private ensureOneDefaultAddress(addresses: Array<{ isDefault?: boolean }>): void {
        const defaultAddresses = addresses.filter(addr => addr.isDefault);

        if (defaultAddresses.length === 0) {
            addresses[0].isDefault = true;
        } else if (defaultAddresses.length > 1) {
            addresses.forEach((addr, index) => {
                addr.isDefault = index === 0;
            });
        }
    }
}
