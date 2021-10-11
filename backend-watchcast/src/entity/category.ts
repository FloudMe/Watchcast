import { Column, Entity } from "typeorm";
import Model from "./Model";

@Entity()
export class Category extends Model {

    @Column()
    name: string;

}