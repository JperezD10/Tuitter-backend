import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tuit } from 'src/tuit/entities/tuit.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}
  
  async create(createLikeDto: CreateLikeDto): Promise<Like>{
    const tuit = await this.tuitRepository.findOne({where: { id: createLikeDto.tuitId }});
    if (!tuit) throw new NotFoundException("Invalid tuit")
    const user = await this.userRepository.findOne({where: { id: createLikeDto.userId }});
    if (!user) throw new NotFoundException("Invalid user")

    const like = new Like();
    like.user = user;
    like.tuit = tuit;
    return await this.likeRepository.save(like);
  }

  async findLikes(tuitId: number): Promise<Like[]> {
    let likes: Like[] = [];
    const tuit = await this.tuitRepository.findOne({where: { id: tuitId }});
    if(!tuit) throw new BadRequestException("Invalid Tuit");
    likes = await this.likeRepository.find({
      where: {tuit},
      relations: ["user"]
    })
    return likes;
  }

  async dislike(tuitId: number, userId: number) {
    const tuit = await this.tuitRepository.findOne({where: { id: tuitId }});
    if(!tuit) throw new NotFoundException("Tuit not found");
    const user = await this.userRepository.findOne({where: { id: userId }});
    if(!user) throw new NotFoundException("User not found");
    const like = await this.likeRepository.findOne({
      where: {user, tuit}
    });
    if(!like) throw new BadRequestException("Invalid Like");
    return await this.likeRepository.delete(like);
  }
}
