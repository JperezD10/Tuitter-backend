import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TuitService } from './tuit.service';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';

@Controller('tuit')
export class TuitController {
  constructor(private readonly tuitService: TuitService) {}

  @Post()
  create(@Body() createTuitDto: CreateTuitDto) {
    return this.tuitService.create(createTuitDto);
  }

  @Get()
  findAll() {
    return this.tuitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tuitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuitDto: UpdateTuitDto) {
    return this.tuitService.update(+id, updateTuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuitService.remove(+id);
  }
}
