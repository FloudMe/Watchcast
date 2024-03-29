import { IsEnum, Length } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Comments } from "./comments";
import Model from "./Model";
import { User } from "./user";
import { Videos } from "./videos";

export type UserRoleType = "user" | "admin"

@Entity()
export class UserDetails extends Model {

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    @Length(1, 255)
    first_name: string;

    @Column()
    @Length(1, 255)
    last_name: string;

    @Column()
    @Length(1, 255)
    country: string;

    @OneToMany(() => Videos, videos => videos.user)
    videos: Videos[];

    @OneToMany(() => Comments, comments => comments.user)
    comments: Comments[];

    @Column({
        type: "enum",
        enum: ["user", "admin"],
        default: "user"
    })
    @IsEnum(["user", "admin", undefined])
    role: UserRoleType;

}