import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/createCoffee.dto';
import { UpdateCofeeDto } from './dto/updateCoffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['Chocolate', 'Vanilla'],
    },
    {
      id: 2,
      name: 'Japanese Rose Blossom Roast',
      brand: 'Hattori Hanzō Brew',
      flavors: ['Rose', 'Miso'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const existingCoffee = this.coffees.find((item) => item.id === +id);
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} was not found`);
    }

    return existingCoffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push({
      ...createCoffeeDto,
      id: this.coffees.length + 1,
    });

    return this.coffees;
  }

  update(id: string, updateCoffeeDto: UpdateCofeeDto) {
    const existingCoffee = this.coffees.find((item) => item.id === +id);
    if (existingCoffee) {
      const updatedCoffee = Object.assign(existingCoffee, updateCoffeeDto);
      return updatedCoffee;
    } else {
      throw new HttpException(
        `Coffee #${id} was not found to be updated`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
