import { NgModule } from "@angular/core";
import { DrawConfiguration } from './classes/draw-configuration';
import { Point } from './classes/point';
import { BoxRoundedCorner } from './forms/box-rounded-corner';

@NgModule({
    imports: [
        DrawConfiguration,
        Point,
        BoxRoundedCorner
    ],
    exports: [
        DrawConfiguration,
        Point,
        BoxRoundedCorner
    ]
})

export class DrawingModule { }