/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, NotFoundException, Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

// @Injectable({ scope: Scope.REQUEST }) // Instantiate per request
// @Injectable({ scope: Scope.TRANSIENT }) // Instantiate everywhere needed
// @Injectable({ scope: Scope.DEFAULT }) // Instantiate once

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configService: ConfigService,
  ) {
    // console.log(coffeeBrands);
    console.log('CoffeesService instantiated');
    const databaseHost = this.configService.get<string>('DATABASE_HOST');
    console.log(databaseHost);
  }

  findAll() {
    // return this.coffees;
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    // const coffee = this.coffees.find((item) => item.id == +id);
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) {
      //   throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    // this.coffees.push(coffee);
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    // const existingCoffee = this.findOne(id);
    const existingCoffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!existingCoffee) throw new NotFoundException(`Coffee #${id} not found`);
    return this.coffeeRepository.save(existingCoffee);
  }

  async remove(id: number) {
    // this.coffees = this.coffees.filter((i) => i.id != id);
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
