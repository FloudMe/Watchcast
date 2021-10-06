import {Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Category } from "./category";
import { Comments } from "./comments";
import  Model  from "./Model";
import { UserDetails } from "./user-details";

@Entity()
export class Videos extends Model {
    @ManyToOne(() => UserDetails, userDetails => userDetails.videos) 
    user: UserDetails;

    @OneToOne(() => Comments, comments => comments.video)
    comments: Comments[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({default: 0})
    views: number;

    @Column()
    path: string;
}