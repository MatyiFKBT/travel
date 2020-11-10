import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";
import { Comment } from "./entities/comment";
import { Tag } from "./entities/tag";
import { TravelEntry } from "./entities/travelentry";
import { User as ApplicationUser } from "./entities/user";

declare global {
  namespace Express {

    interface User {
      id: number;
    }

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      userRepository?: EntityRepository<ApplicationUser>;
      entryRepository?: EntityRepository<TravelEntry>;
      tagRepository?: EntityRepository<Tag>;
      commentRepository?: EntityRepository<Comment>;
    }
  }
}