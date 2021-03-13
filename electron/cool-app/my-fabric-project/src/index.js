import {fabric} from 'fabric';

function run() {
  let canvas = new fabric.Canvas('myCanvas');
  let rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });
  canvas.add(rect);
}

run();