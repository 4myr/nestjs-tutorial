import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    // Dynamic Modules
    // DatabaseModule.register({
    //   type: 'postgres',
    //   host: '127.0.0.1',
    //   username: 'postgres',
    //   password: 'amiR',
    //   port: 5432,
    // }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
