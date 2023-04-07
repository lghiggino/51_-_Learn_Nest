import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CoffeeEvent } from 'src/events/entities/event.entity/event.entity';
import { Repository, Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
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
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      take: limit,
      skip: offset,
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
    return await this.coffeeRepository.save(newCoffee);
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

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recomendations++;

      const recommendEvent = new CoffeeEvent();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
