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
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
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
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const newCoffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    await this.coffeeRepository.save(newCoffee);
    return 'created';
  }

  async update(id: string, updateCoffeeDto: UpdateCofeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const updatedCoffee = await this.coffeeRepository.preload({
      id: parseInt(id, 10),
      ...updateCoffeeDto,
      flavors,
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

  async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorsRepository.create({ name });
  }
}
