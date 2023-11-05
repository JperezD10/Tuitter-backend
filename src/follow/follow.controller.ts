import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  async createFollow(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.createFollow(createFollowDto);
  }

  @Get('follower/:id')
  async getFollowers(@Param('id', ParseIntPipe) id: number) {
    return await this.followService.getFollowers(id);
  }

  @Get('following/:id')
  async getFollowing(@Param('id', ParseIntPipe) id: number) {
    return await this.followService.getFollowing(id);
  }

  @Delete(':followerId/:followingId')
  async unfollow(@Param('followerId', ParseIntPipe) followerId: number, @Param('followingId', ParseIntPipe) followingId: number) {
    return this.followService.unfollow(followerId, followingId);
  }
}
