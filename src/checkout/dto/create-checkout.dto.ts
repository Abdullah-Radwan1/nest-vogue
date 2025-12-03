import { IsNumber } from 'class-validator';
class item {
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;

  name: string;
}
export class CreateCheckoutDto {
  id: string;
  items: item[];
  totalAmount: number;
}
