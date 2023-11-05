import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { Tuit } from './entities/tuit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Follow } from 'src/follow/entities/follow.entity';

@Injectable()
export class TuitService {
  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Follow) private readonly followRepository: Repository<Follow>,
    ) {  }

  async create(createTuitDto: CreateTuitDto): Promise<Tuit> {
    const user = await this.userRepository.findOne({where: {id: createTuitDto.userId}});
    if(!user) throw new NotFoundException("User not found");
    const tuit = this.tuitRepository.create(createTuitDto);
    tuit.user = user;
    if(createTuitDto.parentTuitId > 0){
      const parentTuit = await this.tuitRepository.findOne({where: {id: createTuitDto.parentTuitId}});
      tuit.parentTuit = parentTuit;
    }
    return await this.tuitRepository.save(tuit);  
  }


  async findTuitFollowing(idFollower: number): Promise<Tuit[]> {
    const userFollower = await this.userRepository.findOne({where: {id: idFollower}});
    const followings = await this.followRepository.find({
      where:{follower: userFollower},
      relations: ["following"],
    })
    const followingIds = followings.map((follow) => follow.following.id);
    return await this.tuitRepository.find({
      where: {user: In(followingIds)},
      relations: ["user"],
      order: {date: 'DESC'}
    })
  }

  async removeTuit(tuitId: number) {
    let tuit = await this.tuitRepository.findOne({where: {id: tuitId}});
    if(!tuit) throw new NotFoundException("Tuit not found");
    return await this.tuitRepository.delete(tuitId);
  }
}
