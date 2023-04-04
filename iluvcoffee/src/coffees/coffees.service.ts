import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/createCoffee.dto';
import { UpdateCofeeDto } from './dto/updateCoffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll() {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    const existingCoffee = await this.coffeeRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['flavors'],
    });

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} was not found`);
    }

    return existingCoffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const newCoffee = this.coffeeRepository.create(createCoffeeDto);
    await this.coffeeRepository.save(newCoffee);
    return 'created';
  }

  async update(id: string, updateCoffeeDto: UpdateCofeeDto) {
    const updatedCoffee = await this.coffeeRepository.preload({
      id: parseInt(id, 10),
      ...updateCoffeeDto,
    });

    if (!updatedCoffee) {
      throw new NotFoundException(`Coffee #${id} was not found`);
    }

    return this.coffeeRepository.save(updatedCoffee);
  }

  async remove(id: string) {
    const existingCoffee = await this.coffeeRepository.findOneBy({
      id: parseInt(id, 10),
    });

    await this.coffeeRepository.remove(existingCoffee);
  }
}
