import { Module } from '@nestjs/common';
import { TuitService } from './tuit.service';
import { TuitController } from './tuit.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './entities/tuit.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FollowModule } from 'src/follow/follow.module';

@Module({
  controllers: [TuitController],
  providers: [TuitService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tuit]),
    AuthModule,
    FollowModule
  ],
  exports: [TypeOrmModule]
})
export class TuitModule {}
