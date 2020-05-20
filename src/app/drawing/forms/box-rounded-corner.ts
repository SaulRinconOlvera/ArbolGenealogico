import { Point } from '../classes/point';
import { DrawConfiguration } from '../classes/draw-configuration';
import { ConfigurationBehavior } from '../classes/configuration-behavior';

export class BoxRoundedCorner {
    private context: CanvasRenderingContext2D;
    private start: Point;
    private end:Point;
    private configuration: DrawConfiguration;
    private higlightConfiguration: DrawConfiguration;
    private currentConfiguration: DrawConfiguration;
    private radio:number = 10;
    private objectPath: Path2D;

    // private selectedConfiguration: DrawConfiguration;
    
    // private isMouseOver:boolean;
    // private isSelected: boolean;

    constructor(context: CanvasRenderingContext2D, start: Point, end: Point, behaviorConfiguration: ConfigurationBehavior) {    
        this.context = context;
        this.start = start;
        this.end = end;
       
        // this.isMouseOver = false;
        
        this.configuration = behaviorConfiguration.getDefaultConfiguration();
        this.higlightConfiguration = behaviorConfiguration.getHiglightConfiguration();
        //this.selectedConfiguration = behaviorConfiguration.getSelectedConfiguration();
        this.currentConfiguration = this.configuration;
        // }

        // if(zoom > 0){
        //     this.originalStart.x = this.originalStart.x / percent;
        //     this.originalStart.y = this.originalStart.y / percent;
        //     this.originalEnd.x = this.originalEnd.x / percent;
        //     this.originalEnd.y = this.originalEnd.y / percent;
        // }

        this.drawBox();
    }

    public isPointInPath = (point:Point) : boolean => 
        this.context.isPointInPath(this.objectPath, point.x, point.y);  

    public setMouseOver = (mouseOver:boolean) => {
        
    }

    // public areSelected = (): boolean => this.isSelected;

    // public setSelected = (isSelected: boolean) => {
    //     this.isSelected = isSelected;

    //     if(this.isSelected) this.currentConfiguration = this.selectedConfiguration;
    //     else this.currentConfiguration = this.configuration;

    //     this.drawBox();
    // }
    

    private drawBox = () => {
        this.setConfiguration();
        this.drawRoundedCornerBox()
        this.endDraw();
        this.context.restore();
    }

    // private clearWorkingArea = () => {
    //     this.context.clearRect(
    //         this.start.x - Math.abs(this.higlightConfiguration.lineWidth - this.configuration.lineWidth) - 1 , 
    //         this.start.y - Math.abs(this.higlightConfiguration.lineWidth - this.configuration.lineWidth) - 1, 
    //         this.end.x - this.start.x + Math.abs(this.higlightConfiguration.lineWidth - this.configuration.lineWidth) + this.currentConfiguration.shadowWidth + 1, 
    //         this.end.y - this.start.y + Math.abs(this.higlightConfiguration.lineWidth - this.configuration.lineWidth) + this.currentConfiguration.shadowWidth + 1)
    // }

    private setConfiguration() {
        this.context.lineWidth = this.currentConfiguration.lineWidth ;
        this.context.strokeStyle = this.currentConfiguration.strokeStyle;
        this.context.fillStyle = this.currentConfiguration.fillStyle;
    }

    private drawRoundedCornerBox = () => {
        let cornerPoint : Point;

        let o = new Path2D()
        o.moveTo(this.start.x + this.radio, this.start.y);
        o.lineTo(this.end.x - this.radio,this.start.y);
        cornerPoint = this.drawRoundedCorner("upperRight");
        o.arc(this.end.x - this.radio, this.start.y + this.radio, this.radio, cornerPoint.x , cornerPoint.y);
        o.lineTo(this.end.x,this.end.y - this.radio);
        cornerPoint = this.drawRoundedCorner("lowerRight");
        o.arc(this.end.x - this.radio, this.end.y - this.radio, this.radio, cornerPoint.x, cornerPoint.y);
        o.lineTo(this.start.x + this.radio,this.end.y);
        cornerPoint = this.drawRoundedCorner("lowerLeft");
        o.arc(this.start.x + this.radio, this.end.y - this.radio, this.radio, cornerPoint.x, cornerPoint.y);
        o.lineTo(this.start.x, this.start.y + this.radio);
        cornerPoint = this.drawRoundedCorner("upperLeft");
        o.arc(this.start.x + this.radio, this.start.y + this.radio, this.radio, cornerPoint.x, cornerPoint.y);

        this.objectPath = o;
    }

    private endDraw = () =>  {
        this.context.fill(this.objectPath);
        this.context.stroke(this.objectPath);
    }

    private drawRoundedCorner = (corner: string) : Point => {
        let r1: number; let r2: number;

        switch(corner){
            case "lowerRight":
                r1 = 0; r2 = 90;
                break;
            case "lowerLeft":
                r1 = 90; r2 = 180;
                break;
            case "upperLeft":
                    r1 = 180; r2 = 270;
                    break;
            case "upperRight":
                r1 = 270; r2 = 360;
                break;
        }

        return new Point((r1 * Math.PI) / 180, (r2 * Math.PI) / 180);
    }
}