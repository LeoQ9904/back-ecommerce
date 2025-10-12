import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateOrderDto) {}
