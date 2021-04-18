import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { response } from 'express';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(@Res() response) {
        response.status(200).send('This is all of coffees');
        // return 'This is all of coffees';
    }
    
    @Get(':id')
    findOne(@Param('id') id: Number) {
        return `This is coffee ID ${id}`;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Req() req) {
        return 'Created';
    }

    @Patch(':id')
    update(@Param('id') id: Number, @Body() body) {
        return `Update coffee id ${id} with\n${body}`;
    }

    @Delete(':id')
    remove(@Param('id') id: Number) {
        return `Deleting coffee id ${id}`;
    }

}
