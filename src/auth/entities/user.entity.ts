import { TableEntity } from "src/common/models/TableEntity";
import { Column, Entity } from "typeorm";

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

}
