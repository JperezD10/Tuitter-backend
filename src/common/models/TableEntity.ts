import { PrimaryGeneratedColumn } from "typeorm";

export abstract class TableEntity{
    @PrimaryGeneratedColumn()
    id:number;
}