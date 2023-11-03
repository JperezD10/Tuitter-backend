import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Follow]),
  ]
})
export class FollowModule {}
