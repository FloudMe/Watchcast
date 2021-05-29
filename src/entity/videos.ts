import {Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Category } from "./category";
import { Comments } from "./comments";
import  Model  from "./Model";
import { UserDetails } from "./user-details";

@Entity()
export class Videos extends Model {
    @ManyToOne(() => UserDetails, userDetails => userDetails.videos)
    user: UserDetails;

    @OneToMany(() => Comments, comments => comments.videos)
    comments: Comments[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    views: number;

}