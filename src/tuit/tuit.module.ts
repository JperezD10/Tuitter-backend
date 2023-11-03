import { Module } from '@nestjs/common';
import { TuitService } from './tuit.service';
import { TuitController } from './tuit.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './entities/tuit.entity';

@Module({
  controllers: [TuitController],
  providers: [TuitService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tuit]),
  ],
})
export class TuitModule {}
