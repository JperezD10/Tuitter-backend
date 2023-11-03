import { TableEntity } from "src/common/models/TableEntity";
import { Like } from "src/like/entities/like.entity";
import { Tuit } from "src/tuit/entities/tuit.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class User extends TableEntity {
    @Column('text',{
        unique: true
    })
    email: string;

    @Column('text',{
        select: false
    })
    password: string;

    @Column('text')
    name: string;
    
    @Column('text')
    lastName: string;

    @OneToMany(() => Tuit, (tuit) => tuit.user)
    tuits: Tuit[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers: User[];

    @ManyToMany(() => User, user => user.followers)
    @JoinTable()
    following: User[];

}
