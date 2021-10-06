import {Entity, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import  Model  from "./Model";
import { UserDetails } from "./user-details";
import { Videos } from "./videos";

@Entity()
export class Comments extends Model {
    @OneToOne(() => UserDetails)
    @JoinColumn()
    user: UserDetails;

    @ManyToOne(() => Videos, videos => videos.comments)
    video: Videos;

    @Column()
    description: string;

}