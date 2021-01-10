import { Base } from './base.dto';
import { Comment } from './comment.dto';
import { Tag } from './tag.dto';
import { User } from './user.dto';

export interface TravelEntry extends Base {
    user: User;
    start_date: Date;
    end_date: Date;
    latlon: string;
    desc: string;
    comments?: Array<Comment>;
    tags?: Array<Tag>;
}
