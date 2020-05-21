import { Point } from '../classes/point';
import { DrawConfiguration } from '../classes/draw-configuration';
import { ConfigurationBehavior } from '../classes/configuration-behavior';
import { Person } from 'src/app/data/clases/person';

export class BoxRoundedCorner {
    private context: CanvasRenderingContext2D;
    private start: Point;
    private end: Point;
    private configuration: DrawConfiguration;
    private highlightConfiguration: DrawConfiguration;
    private currentConfiguration: DrawConfiguration;
    private radio: number = 10;
    private objectPath: Path2D;
    private selectedConfiguration: DrawConfiguration;
    private person: Person;
    private image: ImageBitmap;

    // private isMouseOver:boolean;
    private isSelected: boolean;

    constructor(context: CanvasRenderingContext2D, start: Point, end: Point,
                behaviorConfiguration: ConfigurationBehavior, person: Person = null) {
        this.context = context;
        this.start = start;
        this.end = end;
        this.person = person;

        // this.isMouseOver = false;

        this.configuration = behaviorConfiguration.getDefaultConfiguration();
        this.highlightConfiguration = behaviorConfiguration.getHiglightConfiguration();
        this.selectedConfiguration = behaviorConfiguration.getSelectedConfiguration();
        this.currentConfiguration = this.configuration;

        this.drawBox();
    }

    public redraw = () => this.drawBox();

    public isPointInPath = (point: Point): boolean =>
        this.context.isPointInPath(this.objectPath, point.x, point.y)

    public setMouseOver = (mouseOver: boolean) => {
        if(this.isSelected) return;
        this.currentConfiguration = mouseOver ? this.highlightConfiguration : this.configuration;
        this.drawBox();
    }

    public areSelected = (): boolean => this.isSelected;

    public setSelected = (isSelected: boolean) => {
        this.isSelected = isSelected;

        if(this.isSelected) this.currentConfiguration = this.selectedConfiguration;
        else this.currentConfiguration = this.configuration;

        this.drawBox();
    }

    private drawBox = () => {
        this.clearWorkingArea();
        this.setConfiguration();
        this.drawRoundedCornerBox();
        if(this.person) this.getPhoto();
        this.endDraw();
        this.context.restore();
    }

    private getPhoto = () => {

        if(!this.image) {
            const image = new Image();
            image.src = this.person.getPhotoUrl();

            image.onload = () => {
                const options: ImageBitmapOptions = { resizeHeight: 80, resizeWidth: 80  } as ImageBitmapOptions;

                createImageBitmap(image, options).then(
                    (r) => {
                        this.image = r;
                        this.context.drawImage(this.image, this.start.x + 10, this.start.y + 10);
                    }
                );
            };
        }
    }

    private clearWorkingArea = () => {
        this.context.clearRect(
            this.start.x - Math.abs(this.highlightConfiguration.lineWidth - this.configuration.lineWidth) - 2 ,
            this.start.y - Math.abs(this.highlightConfiguration.lineWidth - this.configuration.lineWidth) - 2,
            this.end.x - this.start.x + Math.abs(this.highlightConfiguration.lineWidth - this.configuration.lineWidth) +
             this.currentConfiguration.shadowWidth + 2,
            this.end.y - this.start.y + Math.abs(this.highlightConfiguration.lineWidth - this.configuration.lineWidth) +
             this.currentConfiguration.shadowWidth + 2);
    }

    private setConfiguration() {
        this.context.lineWidth = this.currentConfiguration.lineWidth ;
        this.context.strokeStyle = this.currentConfiguration.strokeStyle;
        this.context.fillStyle = this.currentConfiguration.fillStyle;
    }

    private drawRoundedCornerBox = () => {
        let cornerPoint: Point;

        const o = new Path2D();

        o.moveTo(this.start.x + this.radio, this.start.y);
        o.lineTo(this.end.x - this.radio, this.start.y);
        cornerPoint = this.drawRoundedCorner('upperRight');
        o.arc(this.end.x - this.radio, this.start.y + this.radio, this.radio, cornerPoint.x , cornerPoint.y);
        o.lineTo(this.end.x,this.end.y - this.radio);
        cornerPoint = this.drawRoundedCorner('lowerRight');
        o.arc(this.end.x - this.radio, this.end.y - this.radio, this.radio, cornerPoint.x, cornerPoint.y);
        o.lineTo(this.start.x + this.radio, this.end.y);
        cornerPoint = this.drawRoundedCorner('lowerLeft');
        o.arc(this.start.x + this.radio, this.end.y - this.radio, this.radio, cornerPoint.x, cornerPoint.y);
        o.lineTo(this.start.x, this.start.y + this.radio);
        cornerPoint = this.drawRoundedCorner('upperLeft');
        o.arc(this.start.x + this.radio, this.start.y + this.radio, this.radio, cornerPoint.x, cornerPoint.y);
        o.closePath();
        this.objectPath = o;
    }

    private endDraw = () =>  {
        this.context.fill(this.objectPath);
        if(this.image) this.context.drawImage(this.image, this.start.x + 10, this.start.y + 10);
        this.context.stroke(this.objectPath);
    }

    private drawRoundedCorner = (corner: string): Point => {
        let r1: number; let r2: number;

        switch(corner){
            case 'lowerRight': r1 = 0; r2 = 90; break;
            case 'lowerLeft': r1 = 90; r2 = 180; break;
            case 'upperLeft': r1 = 180; r2 = 270; break;
            case 'upperRight': r1 = 270; r2 = 360;  break;
        }

        return new Point((r1 * Math.PI) / 180, (r2 * Math.PI) / 180);
    }
}