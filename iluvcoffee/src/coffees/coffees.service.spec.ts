import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return an array of coffees', () => {
    const result = service.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('should update a single coffee', () => {
    const updateCoffeeDto = {
      name: 'Thai Lemongrass Roast',
      brand: "Thai C'mon",
      flavors: ['Lemongrass'],
    };

    const result = service.update('1', updateCoffeeDto);
    expect(result).toMatchObject(updateCoffeeDto);
  });

  it('should remove a single coffee', () => {});
});
