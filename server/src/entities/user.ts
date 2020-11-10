import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from 'uuid';
import { Comment } from "./comment";
import { TravelEntry } from "./travelentry";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  unique_code = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany('TravelEntry','user')
  entries = new Collection<TravelEntry>(this);
  
  @OneToMany({entity: ()=> Comment, mappedBy: 'author'})
  comments = new Collection<Comment>(this);
}