import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Get(':id')
  async findLikes(@Param('id', ParseIntPipe) tuitId: number) {
    return await this.likeService.findLikes(tuitId);
  }

  @Delete(':tuitId/:userId')
  async dislike(@Param('tuitId', ParseIntPipe) tuitId: number, @Param('userId', ParseIntPipe) userId: number) {
    return await this.likeService.dislike(tuitId, userId);
  }
}
