import { NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with id exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {
          id: 1,
          name: 'Shipwreck Roast',
          brand: 'Buddy Brew',
          flavors: ['chocolate', 'vanilla'],
        };
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
      describe('otherwise', () => {
        it('should throw the "NotFoundException"', async () => {
          const coffeeId = -1;
          try {
            await service.findOne(coffeeId);
          } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toEqual(`Coffee #${coffeeId} not found`);
          }
        });
      });
    });
  });
});
