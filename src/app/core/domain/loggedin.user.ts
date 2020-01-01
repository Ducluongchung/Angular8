export class LogginUser {

    // Model Login user common
    constructor(access_token: string, username: string, fullname: string, email: string, avatar: string) {
        this.access_token = access_token;
        this.username = username;
        this.email = email;
        this.avartar = avatar;
        this.fullname= fullname;
    }

    public id: string;
    public access_token: string;
    public fullname:string;
    public username: string;
    public password: string;
    public email: string;
    public avartar: string;

}