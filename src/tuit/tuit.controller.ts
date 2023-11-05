import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TuitService } from './tuit.service';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('tuit')
export class TuitController {
  constructor(private readonly tuitService: TuitService) {}

  @Post()
  async create(@Body() createTuitDto: CreateTuitDto) {
    return await this.tuitService.create(createTuitDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) idFollower: number) {
    return await this.tuitService.findTuitFollowing(idFollower);
  }

  @Delete(':id')
  async removeTuit(@Param('id', ParseIntPipe) id: number) {
    return await this.tuitService.removeTuit(id);
  }
}
