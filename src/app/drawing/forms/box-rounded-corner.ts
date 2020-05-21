import { Point } from '../classes/point';
import { DrawConfiguration } from '../classes/draw-configuration';
import { ConfigurationBehavior } from '../classes/configuration-behavior';
import { Person } from 'src/app/data/clases/person';
import { SexEnum } from '../enumerators/sex-enum';
import { environment } from 'src/environments/environment';
import { Pipe } from '@angular/core';

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
        this.objectPath = this.drawRoundedCornerBox();
        if(this.person) this.getPhoto();
        this.endDraw();
        this.drawText();
        this.context.restore();
    }

    private drawText = () => {
        this.context.lineWidth = 1 ;
        this.context.fillStyle = this.selectedConfiguration.strokeStyle;
        this.context.strokeStyle = this.selectedConfiguration.strokeStyle;
        this.context.font = '16px Helvetica';
        this.context.strokeText(this.person.getName(), this.start.x + 80, this.start.y + 23 );
        this.context.fillText(this.person.getName(), this.start.x + 80, this.start.y + 23 );
        this.context.font = '12px Helvetica';
        this.context.fillStyle = this.selectedConfiguration.fillStyle;
        this.context.strokeStyle = this.selectedConfiguration.fillStyle;
        this.context.strokeText(this.person.getSecondName(), this.start.x + 80, this.start.y + 38 );
        this.context.fillText(this.person.getSecondName(), this.start.x + 80, this.start.y + 38 );
    }

    private getPhoto = () => {

        if(!this.image) {
            const image = new Image();
            image.src = this.person.getPhotoUrl();

            image.onload = () => {
                const options: ImageBitmapOptions = { resizeHeight: 80, resizeWidth: 60  } as ImageBitmapOptions;

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

    private setConfiguration = () => {
        this.context.lineWidth = this.currentConfiguration.lineWidth ;
        this.context.strokeStyle = this.currentConfiguration.strokeStyle;

        if(this.person)
            this.context.fillStyle =
                    this.person.getSex() === SexEnum.Male ?
                    environment.graphicConfigurationBehavior.sexFillConfiguration.Male :
                    environment.graphicConfigurationBehavior.sexFillConfiguration.Female;
        else
            this.context.fillStyle = environment.graphicConfigurationBehavior.defaultConfiguration.fillStyle;
    }

    private drawRoundedCornerBox = (point1: Point = this.start, point2: Point = this.end, radio: number = this.radio): Path2D => {
        let cornerPoint: Point;

        const o = new Path2D();

        o.moveTo(point1.x + radio, point1.y);
        o.lineTo(point2.x - radio, point1.y);
        cornerPoint = this.drawRoundedCorner('upperRight');
        o.arc(point2.x - radio, point1.y + radio, radio, cornerPoint.x , cornerPoint.y);
        o.lineTo(point2.x, point2.y - radio);
        cornerPoint = this.drawRoundedCorner('lowerRight');
        o.arc(point2.x - radio, point2.y - radio, radio, cornerPoint.x, cornerPoint.y);
        o.lineTo(point1.x + radio, point2.y);
        cornerPoint = this.drawRoundedCorner('lowerLeft');
        o.arc(point1.x + radio, point2.y - radio, radio, cornerPoint.x, cornerPoint.y);
        o.lineTo(point1.x, point1.y + radio);
        cornerPoint = this.drawRoundedCorner('upperLeft');
        o.arc(point1.x + radio, point1.y + radio, radio, cornerPoint.x, cornerPoint.y);
        o.closePath();

        return o;
    }

    private endDraw = () =>  {
        this.context.fill(this.objectPath);

        if(this.image) {
            // const x = this.drawRoundedCornerBox(
            //     new Point(this.start.x + 10, this.start.y + 10),
            //     new Point(this.start.x + 70, this.start.y + 90), 5);
            // //this.context.clip(x);
            this.context.drawImage(this.image, this.start.x + 10, this.start.y + 10);
        }

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
