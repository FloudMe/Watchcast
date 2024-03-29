import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./Model";
import { UserDetails } from "./user-details";
import { Videos } from "./videos";

@Entity()
export class Comments extends Model {
    @ManyToOne(() => UserDetails, userDetails => userDetails.comments)
    @JoinColumn()
    user: UserDetails;

    @ManyToOne(() => Videos, videos => videos.comments)
    video: Videos;

    @Column()
    description: string;

}