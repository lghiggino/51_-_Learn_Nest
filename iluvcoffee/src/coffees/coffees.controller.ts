import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

type PaginationQueryProps = {
  limit: number;
  offset: number;
};

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll(@Query() paginationQuery: PaginationQueryProps) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns ${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action patches coffee ${id} to ${JSON.stringify(body)}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action deletes ${id} coffee`;
  }
}
