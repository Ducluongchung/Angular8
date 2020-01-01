export class LogginUser {

    constructor(access_token: string, username: string, fullname: string, email: string, avatar: string) {
        this.access_token = access_token;
        this.username = username;
        this.email = email;
        this.avartar = avatar;
    }
    
    public id: string;
    public access_token: string;
    public username: string;
    public password: string;
    public email: string;
    public avartar: string;

}