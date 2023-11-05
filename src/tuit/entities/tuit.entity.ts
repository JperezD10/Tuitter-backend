import { User } from "src/auth/entities/user.entity";
import { TableEntity } from "src/common/models/TableEntity";
import { Like } from "src/like/entities/like.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Tuit extends TableEntity {
    @Column('timestamptz')
    date: Date;

    @Column('text')
    content: string;

    @ManyToOne(() => User, (user) => user.tuits)
    user: User;

    @OneToMany(() => Like, (like) => like.tuit)
    likes: Like[];

    @OneToMany(() => Tuit, (tuit) => tuit.parentTuit)
    replies: Tuit[]; 

    @ManyToOne(() => Tuit, (tuit) => tuit.replies)
    parentTuit: Tuit; 
}
