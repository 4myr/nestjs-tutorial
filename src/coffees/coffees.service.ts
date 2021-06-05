/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, NotFoundException, Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

// @Injectable({ scope: Scope.REQUEST }) // Instantiate per request
// @Injectable({ scope: Scope.TRANSIENT }) // Instantiate everywhere needed
// @Injectable({ scope: Scope.DEFAULT }) // Instantiate once

@Injectable()
export class CoffeesService {
  constructor(
    // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configService: ConfigService,
  ) {
    // console.log(coffeeBrands);
    console.log('CoffeesService instantiated');
    const databaseHost = this.configService.get<string>('DATABASE_HOST');
    console.log(databaseHost);
  }
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Hot chocolate',
      brand: 'Nothing',
      flavors: ['chocolate'],
    },
    {
      id: 3,
      name: 'Espresso',
      brand: 'New Brand',
      flavors: ['espresso', 'chocolate'],
    },
  ];
  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id == +id);
    if (!coffee) {
      //   throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(coffee: any) {
    this.coffees.push(coffee);
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      return `Updateing #${id} with ${updateCoffeeDto}`;
    }
  }

  remove(id: number) {
    this.coffees = this.coffees.filter((i) => i.id != id);
  }
}
