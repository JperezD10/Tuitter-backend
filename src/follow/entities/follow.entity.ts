import { User } from "src/auth/entities/user.entity";
import { TableEntity } from "src/common/models/TableEntity";
import { Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity('Follow')
export class Follow extends TableEntity{
    @ManyToOne(() => User, user => user.followers)
    @JoinColumn({ name: 'followerId' })
    follower: User;

    @ManyToOne(() => User, user => user.following)
    @JoinColumn({ name: 'followingId' })
    following: User;
}
