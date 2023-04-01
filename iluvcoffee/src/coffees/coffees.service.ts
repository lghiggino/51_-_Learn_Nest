import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dtos/createCoffeeDto';
import { UpdateCofeeDto } from './dtos/updateCoffeeDto';
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
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push({
      ...createCoffeeDto,
      id: this.coffees.length + 1,
    });

    return this.coffees;
  }

  update(id: string, updateCoffeeDto: UpdateCofeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const updatedCoffee = Object.assign(existingCoffee, updateCoffeeDto);
      return updatedCoffee;
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
