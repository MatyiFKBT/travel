import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user";
import { Comment } from './comment';
import { Tag } from "./tag";

@Entity()
export class TravelEntry{

    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User
    
    @Property()
    start_date!: Date;
    
    @Property()
    latlon!: String;

    @Property()
    desc!: String;
    
    @Property()
    end_date!: Date;
    
    @OneToMany('Comment','entry')
    comments = new Collection<Comment>(this);

    @ManyToMany(()=> Tag, tag => tag.entries)
    tags = new Collection<Tag>(this);

    @Property()
    createdAt = new Date();
  
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}