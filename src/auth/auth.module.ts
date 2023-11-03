import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),

    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
  ],
  exports: [JwtStrategy,TypeOrmModule,PassportModule,JwtModule]
})
export class AuthModule {}
