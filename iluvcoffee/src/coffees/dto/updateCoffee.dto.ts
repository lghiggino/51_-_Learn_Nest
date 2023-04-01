import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './createCoffee.dto';

export class UpdateCofeeDto extends PartialType(CreateCoffeeDto) {}
