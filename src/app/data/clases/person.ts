export class Person {
    private photoURl: string;
    private name: string;

    constructor(name: string, photoUrl: string) {
        this.photoURl = photoUrl;
        this.name = name;
    }

    public getPhotoUrl = (): string => this.photoURl;
    public getName = (): string => this.name;
}
