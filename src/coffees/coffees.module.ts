import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// useClass custom provider
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

//     // Using constants with useFactory
// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['Benmano', 'Nescafe'];
//   }
// }
// Custom provider
// class MockCoffeesService {}
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }], // Custom Provider
  providers: [
    CoffeesService,
    // Async providers
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['Benmano', 'Nescafe']);
        return coffeeBrands;
      },
      inject: [Connection],
    },
    // Using constants with useValue
    // CoffeeBrandsFactory,
    // { provide: COFFEE_BRANDS, useValue: ['Nescafe', 'Benmano'] },

    // Using constants with useFactory
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },

    // useClass provider
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
