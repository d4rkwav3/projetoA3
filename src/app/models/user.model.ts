export class User {
    private id!: number | undefined;
    private login!: string;
    private passwd!: string;

    constructor(login: string, passwd: string, id?: number){
        this.login = login;
        this.passwd = passwd;
        this.id = id;
    }

    getLogin() :string {
        return this.login;
    }

    getPass() :string {
        return this.passwd;
    }
}