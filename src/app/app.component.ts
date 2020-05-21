import { Component } from '@angular/core';
import { TreeDraw } from './drawing/tree/tree-draw';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Arbol';

  constructor() {
    const canvas = document.getElementById('canvas');
    const tree = new TreeDraw(canvas as HTMLCanvasElement);

    // const canvas1: HTMLCanvasElement = document.getElementById('canvas1') as HTMLCanvasElement;
    // const ctx = canvas1.getContext('2d');
 
    // ctx.fillStyle = 'green';
    // ctx.fillRect(100, 100, 150, 100);
  }
}
