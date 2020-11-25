import { Base } from './base.dto';
import { TravelEntry } from './travelentry.dto';

export interface Comment extends Base {
    text: string;
    author: string;
    entry: TravelEntry;
}