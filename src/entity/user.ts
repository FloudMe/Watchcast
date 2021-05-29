import { IsEmail, Length } from "class-validator";
import {Entity, Column} from "typeorm";
import  Model  from "./Model";

@Entity('users')
export class User extends Model {

    @Column()
    @Length(1,255)
    @IsEmail()
    email: string;

    @Column()
    password: string;

}