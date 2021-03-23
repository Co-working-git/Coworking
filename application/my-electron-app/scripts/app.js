var canvas = new fabric.Canvas('canvas', {
  selection: false
});
var grid = 25;


// create grid
for (var i = 0; i < (2000 / grid); i++) {
  canvas.add(new fabric.Line([i * grid, 0, i * grid, canvas.height], {
    stroke: '#ccc',
    selectable: false
  }));
  canvas.add(new fabric.Line([0, i * grid, canvas.width, i * grid], {
    stroke: '#ccc',
    selectable: false
  }))
}
//add random objects
let counter = 0;
for (var i = 0; i<Math.floor((Math.random() * 500) + 1);i++)
{
  canvas.add(new fabric.Rect({
    left: Math.floor((Math.random() * 500) + 1),
    top: Math.floor((Math.random() * 500) + 1),
    width: 100,
    height: 50,
    fill: "#" + ((1<<24)*Math.random() | 0).toString(16),
    originX: 'left',
    originY: 'top',
    centeredRotation: true
  }));
counter++
}
console.log(counter);
// add objects

canvas.add(new fabric.Rect({
  left: 100,
  top: 100,
  width: 50,
  height: 50,
  fill: '#faa',
  originX: 'left',
  originY: 'top',
  centeredRotation: true
}));
canvas.add(new fabric.Rect({
  left: 100,
  top: 100,
  width: 50,
  height: 50,
  fill: 'blue',
  originX: 'left',
  originY: 'top',
  centeredRotation: true
}));
canvas.add(new fabric.Rect({
  left: 100,
  top: 100,
  width: 50,
  height: 50,
  fill: 'yellow',
  originX: 'left',
  originY: 'top',
  centeredRotation: true
}));
canvas.add(new fabric.Rect({
  left: 400,
  top: 500,
  width: 200,
  height: 50,
  fill: 'purple',
  originX: 'left',
  originY: 'top',
  centeredRotation: true
}));

canvas.add(new fabric.Circle({
  left: 300,
  top: 300,
  radius: 50,
  fill: '#9f9',
  originX: 'left',
  originY: 'top',
  centeredRotation: true
}));

// snap to grid
canvas.on('object:moving', function(options) {
  if (Math.round(options.target.left / grid * 4) % 4 == 0 &&
    Math.round(options.target.top / grid * 4) % 4 == 0) {
    options.target.set({
      left: Math.round(options.target.left / grid) * grid,
      top: Math.round(options.target.top / grid) * grid
    }).setCoords();
  }
});