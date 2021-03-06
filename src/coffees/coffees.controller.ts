import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
// import { response } from 'express';

// @UsePipes(ValidationPipe) // @UsePipes(new ValidationPipe())
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {} 

  @Public()
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Protocol() protocol,
  ) {
    // Timeout
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // Using express (@Res() response)
    // response.status(200).send('This is all of coffees');

    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeesService.create(createCoffeeDto);
    return 'created';
  }

  @Patch(':id')
  // @Body(ValidationPipe)
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeesService.update(id, updateCoffeeDto);
    return `Update coffee id ${id} with\n${updateCoffeeDto}`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.coffeesService.remove(id);
    return 'Deleted';
  }
}
