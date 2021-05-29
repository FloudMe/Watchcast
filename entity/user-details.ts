import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm";
import {User} from "./User";

export type UserRoleType =  "klient" | "admin" 

@Entity()
export class UserDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    country: string;

    @Column({
        type: "enum",
        enum: ["klient", "admin"],
        default: "klient"
    })
    role: UserRoleType;

}