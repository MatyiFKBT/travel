import { Cascade, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Collection } from "@mikro-orm/core/entity/Collection";
import { TravelEntry } from "./travelentry";
import { User } from "./user";

@Entity()
export class Tag{

    @PrimaryKey()
    id!: number;

    @Property()
    text!: string; 

    @ManyToMany(()=>TravelEntry, 'tags', { owner: true, cascade: [Cascade.ALL] })
    entries = new Collection<TravelEntry>(this);
    
    @ManyToOne(()=>User)
    user!: User

    @Property()
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

}