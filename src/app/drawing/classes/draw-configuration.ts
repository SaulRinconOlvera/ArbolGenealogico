export class DrawConfiguration {
    lineWidth: number;
    strokeStyle: string;
    fillStyle: string;
    shadow: boolean;
    shadowColor: string;
    shadowWidth: number;

    constructor(lineWidth: number, strokeStyle: string, fillStyle: string, shadow: boolean, shadowColor: string, shadowWidth: number) {
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.shadow = shadow;
        this.shadowColor = shadowColor;
        this.shadowWidth = shadowWidth;
    }
}