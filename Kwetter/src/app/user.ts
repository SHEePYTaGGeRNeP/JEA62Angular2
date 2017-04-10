export class User {
    id: number;
    username: string = '';
    followers: Array<User>;
    following: Array<User>;

    bio: string = '';
    location: string = '';
    website: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
