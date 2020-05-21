import { SexEnum } from 'src/app/drawing/enumerators/sex-enum';

export class Person {
    private photoURl: string;
    private name: string;
    private secondNames: string;
    private sex: SexEnum;

    constructor(name: string, secondName: string,  photoUrl: string, sex: SexEnum) {
        this.photoURl = photoUrl;
        this.name = name;
        this.secondNames = secondName;
        this.sex = sex;
    }

    public getPhotoUrl = (): string => this.photoURl;
    public getName = (): string => this.name;
    public getSecondName = () => this.secondNames;
    public getSex = (): SexEnum => this.sex;
}
