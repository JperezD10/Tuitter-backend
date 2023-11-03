import { User } from "src/auth/entities/user.entity";
import { TableEntity } from "src/common/models/TableEntity";
import { Like } from "src/like/entities/like.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Tuit extends TableEntity {
    @Column('date')
    date: Date;

    @Column('text')
    description: string;

    @ManyToOne(() => User, (user) => user.tuits)
    user: User;

    @OneToMany(() => Like, (like) => like.tuit)
    likes: Like[];

    @OneToMany(() => Tuit, (tuit) => tuit.parentTuit)
    replies: Tuit[]; 

    @ManyToOne(() => Tuit, (tuit) => tuit.replies)
    parentTuit: Tuit; 
}
