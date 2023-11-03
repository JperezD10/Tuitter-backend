import { User } from "src/auth/entities/user.entity";
import { TableEntity } from "src/common/models/TableEntity";
import { Tuit } from "src/tuit/entities/tuit.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class Like extends TableEntity {

    @ManyToOne(() => User, (user) => user.likes)
    user:User

    @ManyToOne(() => Tuit, (tuit) => tuit.likes)
    tuit:Tuit;
}
