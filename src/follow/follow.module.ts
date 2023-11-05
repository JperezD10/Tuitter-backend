import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Follow]),
    AuthModule
  ],
  exports: [TypeOrmModule]
})
export class FollowModule {}
