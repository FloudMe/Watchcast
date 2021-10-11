import { IsEmail, Length } from "class-validator";
import { Column, Entity, Unique } from "typeorm";
import Model from "./Model";

@Entity('users')
@Unique(["email"])
export class User extends Model {

    @Column({ name: 'email' })
    @Length(1, 255)
    @IsEmail()
    email: string;

    @Column()
    password: string;

}