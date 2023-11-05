import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { TuitModule } from 'src/tuit/tuit.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Like]),
    TuitModule,
    AuthModule
  ],
  exports:[TypeOrmModule]
})
export class LikeModule {}
