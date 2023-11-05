import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginDto } from './dto';
import {hashSync, compareSync} from 'bcrypt';
import { AuthResponse, JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthResponse> {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: await this.generateToken({id: user.id})
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async login(loginUserDto: LoginDto): Promise<AuthResponse> {
    const {email, password} = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {email},
      select: {password: true, id: true}
    });

    if(!user || !compareSync(password, user.password)) 
      throw new UnauthorizedException(`Credentials are not valid for email ${email}`);
    delete user.password
    return {
      ...user,
      token: await this.generateToken({id: user.id})
    };
  }
  async generateToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleErrors(error){
    if(error.code === '23505') throw new BadRequestException(error.detail);

    console.error(error)
    throw new InternalServerErrorException('An error happened. Please talk with admins')
}
}
