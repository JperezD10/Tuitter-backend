import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class FollowService {

  constructor(
    @InjectRepository(Follow) private readonly followRepository: Repository<Follow>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

  async createFollow(createFollowDto: CreateFollowDto): Promise<Follow> {
    const follower = await this.userRepository.findOne({where: {id: createFollowDto.followerId}});
    if(!follower) throw new BadRequestException("Invalid Follower");
    const following = await this.userRepository.findOne({where: {id: createFollowDto.followingId}});
    if(!following) throw new BadRequestException("Invalid Following");

    const follow = this.followRepository.create({
      follower,
      following
    });

    return await this.followRepository.save(follow);
  }

  async getFollowers(userId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) throw new NotFoundException('No such user');
    let follows = await this.followRepository.find({ 
      where: {following: user},
      relations: ["follower"]
    });
    return follows;
  }

  async getFollowing(userId: number) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) throw new NotFoundException('No such user');
    let follows = await this.followRepository.find({ 
      where: {follower: user},
      relations: ["following"]
    });
    return follows;
  }

  async unfollow(followerId: number, followingId: number) {
    const follower = await this.userRepository.findOne({where: {id: followerId}});
    if (!follower) throw new NotFoundException('No such follower');
    const following = await this.userRepository.findOne({where: {id: followingId}});
    if (!following) throw new NotFoundException('No such following');

    const follow = await this.followRepository.findOne({where: { follower, following }});
    if(!follow) throw new NotFoundException("Follow not found");
    return await this.followRepository.delete(follow);
  }
}
