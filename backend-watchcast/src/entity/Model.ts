import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, BeforeInsert} from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity()
export default abstract class Model extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "uuid"})
    uuid: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @BeforeInsert()
    createdUuid(){
        this.uuid = uuid()
    }

    toJSON(){
        return{...this, id:undefined};
    }
}