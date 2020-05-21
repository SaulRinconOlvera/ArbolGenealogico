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

  }
}
