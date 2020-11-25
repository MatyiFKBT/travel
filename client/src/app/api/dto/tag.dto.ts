import { Base } from './base.dto';
import { TravelEntry } from './travelentry.dto';
import { User } from './user.dto';

export interface Tag extends Base {
    text: string;
    entries?: Array<TravelEntry>;
    user?: User;
}