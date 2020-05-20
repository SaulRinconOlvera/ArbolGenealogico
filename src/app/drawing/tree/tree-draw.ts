import { DrawConfiguration } from '../classes/draw-configuration';
import { BoxRoundedCorner } from '../forms/box-rounded-corner';
import { Point } from '../classes/point';
import { ConfigurationBehavior } from '../classes/configuration-behavior';

export class TreeDraw {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private configurationBehavior: ConfigurationBehavior;

    private radio:number = 10;

    //------------------------------------------------------------
    //  This next data must be set in a configuration class
    //------------------------------------------------------------
    //  Configuration
    private lineWidth: number = 3;
    private strokeStyle: string = '#37E';
    private fillStryle: string = '#FFA';
    private showShadow: boolean = false;
    private shadowColor: string = 'rgba(0, 0, 0, 0.5)';
    private shadowWidth: number = 10;
    private currentScale: number = 1;

    //  Higlight Configuration
    private hLineWidth: number = 5;
    private hStrokeStyle: string = '#444';
    private hFillStryle: string = '#0FA';
    private hShowShadow: boolean = true;
    private hShadowColor: string = 'rgba(0, 0, 0, 0.5)';
    private hShadowWidth: number = 10;
    //------------------------------------------------------------

    private boxes: BoxRoundedCorner[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.configureCanvas(canvas);
        this.drawTest();
    }

    private drawTest = () => {
        this.boxes = [];
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100,300), new Point(200,400), this.configurationBehavior));
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100,150), new Point(200,250), this.configurationBehavior));
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100,10), new Point(200,110), this.configurationBehavior));
    }

    private configureCanvas = (canvas: HTMLCanvasElement) => {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.setConfiguration();
    }

    private setConfiguration = () => {
        this.configurationBehavior = new ConfigurationBehavior(
            this.getDefaultConfiguration(), this.getHiglightConfiguration() , this.getSelectedConfiguration());

        this.canvas.addEventListener("mousemove", this.canvarMouseMove.bind(this));
        // this.canvas.addEventListener("click", this.canvasClick.bind(this));
        this.canvas.addEventListener('wheel', this.canvasWheel.bind(this));
    }

    private getDefaultConfiguration = () : DrawConfiguration =>
        new DrawConfiguration(this.lineWidth, this.strokeStyle, this.fillStryle, this.showShadow, this.shadowColor, this.shadowWidth);

    private getHiglightConfiguration = () : DrawConfiguration  =>
        new DrawConfiguration(this.hLineWidth, this.hStrokeStyle, this.hFillStryle, this.hShowShadow, this.hShadowColor, this.hShadowWidth);

    private getSelectedConfiguration = () : DrawConfiguration  =>
        new DrawConfiguration(this.hLineWidth, this.hStrokeStyle, "#0DA6CA", this.hShowShadow, this.hShadowColor, this.hShadowWidth);

    private canvasWheel = (event: WheelEvent) => {
        if(event.deltaY != 0) {

            let zoomBehavior: number = 0.05;

            if(event.deltaY > 0) zoomBehavior = zoomBehavior * -1;

            this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.context.scale(1 + zoomBehavior, 1 + zoomBehavior);
            this.drawTest();
        }
    }

    // private redraw = () => {
    //     this.boxes.forEach(box => {
    //         box.redraw(this.currentScale);
    //     })
    // }

    // private canvasClick = (event: MouseEvent) => {
    //     let currentPoint:Point = new Point(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);

    //     this.boxes.forEach(box => {
    //         if(box.isPointInDraw(currentPoint, this.currentScale)) box.setSelected(!box.areSelected());
    //         else box.setSelected(false);
    //     })
    // }

    private canvarMouseMove = (event: MouseEvent)  =>  {

        let currentPoint:Point = new Point(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);

        this.canvas.style.setProperty("cursor","default");
        this.boxes.forEach(box => {
            if(box.isPointInPath(currentPoint))
            {
                box.setMouseOver(true);
                this.canvas.style.setProperty("cursor","pointer");
            }
            else box.setMouseOver(false);
        })
    }
}