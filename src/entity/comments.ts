import {Entity, Column, ManyToOne} from "typeorm";
import  Model  from "./Model";
import { UserDetails } from "./user-details";
import { Videos } from "./videos";

@Entity()
export class Comments extends Model {
    @ManyToOne(() => UserDetails, userDetails => userDetails.comments)
    user: UserDetails;

    @ManyToOne(() => Videos, videos => videos.comments)
    videos: Videos;

    @Column()
    description: string;

}