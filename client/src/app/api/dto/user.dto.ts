import { Base } from './base.dto';

export interface User extends Base {
    username: string;
    email: string;
}