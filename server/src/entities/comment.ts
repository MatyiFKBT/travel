import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { TravelEntry } from "./travelentry";
import { User } from "./user";

@Entity()
export class Comment{

    @PrimaryKey()
    id!: number;

    @Property()
    text!: string; 

    @ManyToOne()
    author!: User;

    @ManyToOne()
    entry!: TravelEntry

    @Property()
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

}