import { Configuration, Options, IDatabaseDriver } from "@mikro-orm/core";
import { Comment } from "./src/entities/comment";
import { Tag } from "./src/entities/tag";
import { TravelEntry } from "./src/entities/travelentry";
import { User } from "./src/entities/user";

export default {
    type: "sqlite",
    dbName: process.env.NODE_ENV === 'test' ? 'test.db' : /* istanbul ignore next: production db */ 'travel.db',
    entities: [User, TravelEntry, Comment, Tag]
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;