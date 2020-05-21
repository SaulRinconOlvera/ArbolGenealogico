import { DrawConfiguration } from '../classes/draw-configuration';
import { BoxRoundedCorner } from '../forms/box-rounded-corner';
import { Point } from '../classes/point';
import { ConfigurationBehavior } from '../classes/configuration-behavior';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/data/clases/person';
import { SexEnum } from '../enumerators/sex-enum';

export class TreeDraw {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private configurationBehavior: ConfigurationBehavior;
    private originalTransform: DOMMatrix;

    private boxes: BoxRoundedCorner[] = [];
    private people: Person[] = [];
    private currentZoom: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        this.configureCanvas(canvas);
        this.drawTest();
    }

    private drawTest = () => {
        this.boxes = [];

        this.people.push(new Person('Saúl', 'Rincón Olvera', './assets/dist/img/Saul.jpg', SexEnum.Male));
        this.people.push(new Person('Janeth', 'Santillan Rosales', './assets/dist/img/Janeth.jpg', SexEnum.Female));
        this.people.push(new Person('Roosevelt Fernando', 'Rincón Santillan', './assets/dist/img/Roosevelt.jpg', SexEnum.Male));
        this.people.push(new Person('Samuel', 'Rincón Santillan', './assets/dist/img/Samuel.jpg', SexEnum.Male));
        this.people.push(new Person('Paulina Janeth', 'Rincón Santillan', './assets/dist/img/Paulina.png', SexEnum.Female));

        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 10), new Point(350, 110), this.configurationBehavior, this.people[0]));
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 150), new Point(350, 250), this.configurationBehavior, this.people[1]));
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 290), new Point(350, 390), this.configurationBehavior, this.people[2]));
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 430), new Point(350, 530), this.configurationBehavior, this.people[3]));
        this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 570), new Point(350, 670), this.configurationBehavior, this.people[4]));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 710), new Point(350, 810), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(100, 850), new Point(350, 950), this.configurationBehavior));

        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 10), new Point(350, 110), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 150), new Point(350, 250), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 290), new Point(350, 390), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 430), new Point(350, 530), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 570), new Point(350, 670), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 710), new Point(350, 810), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(250, 850), new Point(350, 950), this.configurationBehavior));

        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 10), new Point(500, 110), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 150), new Point(500, 250), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 290), new Point(500, 390), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 430), new Point(500, 530), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 570), new Point(500, 670), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 710), new Point(500, 810), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(400, 850), new Point(500, 950), this.configurationBehavior));

        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 10), new Point(650, 110), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 150), new Point(650, 250), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 290), new Point(650, 390), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 430), new Point(650, 530), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 570), new Point(650, 670), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 710), new Point(650, 810), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(550, 850), new Point(650, 950), this.configurationBehavior));

        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 10), new Point(800, 110), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 150), new Point(800, 250), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 290), new Point(800, 390), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 430), new Point(800, 530), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 570), new Point(800, 670), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 710), new Point(800, 810), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(700, 850), new Point(800, 950), this.configurationBehavior));

        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 10), new Point(950, 110), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 150), new Point(950, 250), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 290), new Point(950, 390), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 430), new Point(950, 530), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 570), new Point(950, 670), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 710), new Point(950, 810), this.configurationBehavior));
        // this.boxes.push(new BoxRoundedCorner(this.context, new Point(850, 850), new Point(950, 950), this.configurationBehavior));
    }

    private configureCanvas = (canvas: HTMLCanvasElement) => {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.originalTransform = this.context.getTransform();

        this.setConfiguration();
    }

    private setConfiguration = () => {
        this.configurationBehavior = new ConfigurationBehavior(
            this.getDefaultConfiguration(), this.getHighlightConfiguration() , this.getSelectedConfiguration());

        this.canvas.addEventListener('mousemove', this.canvarMouseMove.bind(this));
        this.canvas.addEventListener('click', this.canvasClick.bind(this));
        this.canvas.addEventListener('wheel', this.canvasWheel.bind(this));
        this.canvas.addEventListener('mousedown', this.canvasMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.canvasMouseUp.bind(this));
    }

    private getDefaultConfiguration = (): DrawConfiguration =>
        environment.graphicConfigurationBehavior.defaultConfiguration as DrawConfiguration

    private getHighlightConfiguration = (): DrawConfiguration  =>
    environment.graphicConfigurationBehavior.highlightConfiguration as DrawConfiguration

    private getSelectedConfiguration = (): DrawConfiguration  =>
        environment.graphicConfigurationBehavior.selectedConfiguration as DrawConfiguration

    private canvasMouseDown = (event: MouseEvent) => {
        if(this.getCurrentCursorStyle() !== 'default') return;
        this.canvas.style.setProperty('cursor', 'all-scroll');
    }

    private canvasMouseUp = (event: MouseEvent) => {
        this.canvas.style.setProperty('cursor', 'default');
    }

    private getCurrentCursorStyle = (): string => this.canvas.style.cursor;

    private canvasWheel = (event: WheelEvent) => {
        if (event.deltaY !== 0) {

            let zoomBehavior: number = 0.05;
            if (event.deltaY > 0) { zoomBehavior = zoomBehavior * -1; }

            if(zoomBehavior < 0 && this.currentZoom <= environment.graphicConfigurationBehavior.zoomBehavior.minZoom) return;
            if(zoomBehavior > 0 && this.currentZoom >= environment.graphicConfigurationBehavior.zoomBehavior.maxZoom) return;

            this.currentZoom += zoomBehavior;
            console.log(this.currentZoom);

            const currentTransform = this.context.getTransform();

            this.context.setTransform(this.originalTransform);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.setTransform(currentTransform);
            this.context.scale(1 + zoomBehavior, 1 + zoomBehavior);
            this.redraw();
        }
    }

    private redraw = () => this.boxes.forEach(box => { box.redraw(); });

    private canvasClick = (event: MouseEvent) => {
        const currentPoint: Point = new Point(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);

        this.boxes.forEach(box => {
            if(box.isPointInPath(currentPoint)) box.setSelected(!box.areSelected());
            else box.setSelected(false);
        });
    }

    private canvarMouseMove = (event: MouseEvent)  =>  {

        const currentPoint: Point = new Point(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);

        if(this.getCurrentCursorStyle() == 'pointer')
            this.canvas.style.setProperty('cursor', 'default');

        this.boxes.forEach(box => {
            if (box.isPointInPath(currentPoint))
            {
                if(environment.graphicConfigurationBehavior.highLightOnMouseOver)  box.setMouseOver(true);
                this.canvas.style.setProperty('cursor', 'pointer');
            }
            else {
                if(environment.graphicConfigurationBehavior.highLightOnMouseOver) box.setMouseOver(false);
            }
        });
    }
}
