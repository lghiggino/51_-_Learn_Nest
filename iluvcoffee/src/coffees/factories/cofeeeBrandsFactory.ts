import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return this.brandList().filter((brand) => brand.isAvailable);
  }

  brandList() {
    return [
      { brand: 'Buddy Brew', isAvailable: true },
      { brand: 'Nescafe', isAvailable: true },
      { brand: 'Starbucks', isAvailable: false },
      { brand: 'Folgers', isAvailable: true },
    ];
  }
}
