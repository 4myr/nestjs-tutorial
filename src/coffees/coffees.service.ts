import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
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
      return `Updateing #${id} with ${updateCoffeeDto}`
    }
  }

  remove(id: number) {
    this.coffees = this.coffees.filter((i) => i.id != id);
  }
}
