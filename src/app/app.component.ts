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
    var canvas = document.getElementById('canvas');
    
    var treeDraw = new TreeDraw(canvas as HTMLCanvasElement);

  }
}
