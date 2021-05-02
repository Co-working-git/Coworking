var canvas = new fabric.Canvas('canvas', {
    selection: false
});
    


window.addEventListener('load', 
  function() { 
    window.addEventListener("resize", ResizeScreen);
    window.resizeTo(window.screen.availWidth, window.screen.availHeight); 
    canvas.setDimensions({width: window.innerWidth-175, height:window.innerHeight});
    function ResizeScreen() {
        canvas.setDimensions({width: window.innerWidth-175, height:window.innerHeight});
        }
  }, false);

//zooming and panning for the canvas
canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 1) zoom = 1;
    if (zoom < 0.20) zoom = 0.20;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
})

canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
    }
});
canvas.on('mouse:move', function (opt) {
    if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
    }
});
canvas.on('mouse:up', function (opt) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
});
canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({x: opt.e.offsetX, y: opt.e.offsetY}, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});
//saving a picture of your canvas
function Save2() {
    var gh = canvas.toDataURL('png');

    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';
    a.click()
}
//copy and pasting of blocks
let keysPressed = {};
document.addEventListener('keydown', function (event) {

    keysPressed[event.key] = true;
    if (keysPressed['Control'] && event.key == 'c') {
        Copy();
    } else if (keysPressed['Control'] && event.key == 'v') {
        Paste();
    }

    if (keysPressed['Control'] && event.key == 't') {
        Text();
    }
});


function Copy() {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    canvas.getActiveObject().clone(function (cloned) {
        _clipboard = cloned;
    });
}

function Paste() {
    // clone again, so you can do multiple copies.
    _clipboard.clone(function (clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function (obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}

// create grid
var grid = 100;
let amountGrid = 0;

function createGrid() {
    if (amountGrid === 0) {
        console.log("before extra grid added: " + amountGrid);
        for (var i = 0; i < (3000 / grid); i++) {
            canvas.add(new fabric.Line([0, i * grid, 3000*2, i * grid], {
                stroke: '#7F7F7F',
                selectable: false,
                "evented": false,
                excludeFromExport: true
            }))
        }
        for (var i = 0; i < (6000 / grid); i++) {
            canvas.add(new fabric.Line([i * grid, 0, i * grid, 3000], {
                stroke: '#7F7F7F',
                selectable: false,
                "evented": false,
                excludeFromExport: true
            }));
        }
        
        amountGrid++;
        console.log("after extra grid added: " + amountGrid);
    }
}

//create the grid when the app loads :)
createGrid();
console.log(amountGrid);
// Resize canvas

const buildZone = document.getElementById('buildZone');
const wrapper = document.getElementById('wrapper');
const paddingShift = 60;

function resizeCanvas() {
    // Width
    const newWidth = canvas.getWidth() + (window.innerWidth - (buildZone.offsetWidth + paddingShift));
    if (newWidth < 640 && newWidth > 200) canvas.setWidth(newWidth);

    // Height
    const newHeight = canvas.getHeight() + (window.innerHeight - (wrapper.offsetHeight + paddingShift));
    if (newHeight < 360 && newHeight > 250) canvas.setHeight(newHeight);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// Clear canvas - Delete shapes

document.getElementById('clear').addEventListener('click', () => {
    !deleteActiveObjects() && canvas.clear();
    createGrid();
    
});

function deleteActiveObjects() {
    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects.length) {
        amountGrid--;
        return false;
    }

    if (activeObjects.length) {
        activeObjects.forEach(function (object) {
            canvas.remove(object);
        });
    } else {
        canvas.remove(activeObjects);
        amountGrid--;
        createGrid();
    }

    return true;
}
// snap to grid
canvas.on('object:moving', function (options) {
    if (Math.round(options.target.left / grid * 4) % 4 == 0 &&
        Math.round(options.target.top / grid * 4) % 4 == 0) {
        options.target.set({
            left: Math.round(options.target.left / grid) * grid,
            top: Math.round(options.target.top / grid) * grid
        }).setCoords();
    }
});

//saving functionaliteit
function Save() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(canvas.toDatalessJSON(), null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "data.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    var json = JSON.stringify(canvas.toDatalessJSON());
    console.log(json);
}

//loading functionaliteit
function readFile(input) {
    let file = document.getElementById("myFile").files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      
      console.log(reader.result);
      canvas.loadFromJSON(reader.result);
      amountGrid--;
      console.log(amountGrid + " :before loading the file");
      createGrid();
      console.log(amountGrid + " :after loading the file");
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}
//rotate function
function Rotate(){ 
    let angle =  canvas.getActiveObject().angle;
    canvas.getActiveObject().set('angle', angle+parseInt(90)).setCoords();
    canvas.requestRenderAll();
}
/*
//object inspector 
canvas.on('selection:created', function(){
    var obj = canvas.getActiveObject();
    document.getElementById('lengteBlok').innerHTML.value = "Length: " + obj.Width.toString();
    console.log("Length: " +  obj.Width.toString());

});
*/

//selecting options for the objects
  function GroupAll() {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== 'activeSelection') {
      return;
    }
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
  }

  function UnGroupAll() {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== 'group') {
      return;
    }
    canvas.getActiveObject().toActiveSelection();
    canvas.requestRenderAll();
  }

  function DeSelect()  {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }



//color the shapes
document.getElementById('color-picker').addEventListener("input", function(){
    userColor = document.getElementById('color-picker').value;
   canvas.getActiveObject().set("fill", userColor);
   canvas.renderAll();  }, false);

//color the outline of the shapes
document.getElementById('color-picker2').addEventListener("input", function(){
    userColor = document.getElementById('color-picker2').value;
   canvas.getActiveObject().set("stroke", userColor);
   canvas.renderAll();  }, false);

// SHAPES STYLES  ―――――――――――――――――――――――――


const styleZone = document.getElementById('styleZone');
const colors = ['#43c8bf', '#896bc8', '#e54f6b', '#000000'];
let defaultColor = colors[3];
let activeElement = null;
const isSelectedClass = 'isSelected';
colors.forEach((color, i) => {
    const span = document.createElement('span');
    span.style.background = color;

    if (i === 0) {
        span.className = isSelectedClass;
        activeElement = span;
    }

    let icon = document.createElement('i');
    icon.className = 'feather icon-check';
    span.appendChild(icon);

    styleZone.appendChild(span);

    span.addEventListener('click', (event) => {
        if (span.className !== isSelectedClass) {
            span.classList.toggle(isSelectedClass);
            activeElement.classList.remove(isSelectedClass);
            activeElement = span;
            strokeColor = color;
        }

        if (canvas.getActiveObject()) {
            const activeObjects = canvas.getActiveObjects();
            if (!activeObjects.length) return;

            activeObjects.forEach(function (object) {
                object.set('stroke', strokeColor);
            });

            canvas.renderAll();
        }
    })
});

// SHAPES CREATION  ―――――――――――――――――――――――――

let strokeWidth = 2;
let strokeColor = defaultColor;
let leftCenter = canvas.width / 2 - 25;
let topCenter = canvas.height / 2 - 25;

//letting the user add text
function Text() {
    canvas.add(new fabric.IText('Edit me!', {
        fontFamily: 'arial black',
        left: leftCenter,
        top: topCenter
    }));
}


// CostumWall

document.getElementById('costumWall').addEventListener('click', () => {
    canvas.add(new fabric.Rect({
        strokeWidth: parseInt(document.getElementById('dikte').value) / 5,
        stroke: strokeColor,
        fill: 'transparent',
        width: parseInt(document.getElementById('lengte').value) * 100,
        height: parseInt(document.getElementById('breedte').value) * 100,
        left: leftCenter,
        top: topCenter
    }));
});

// Square

document.getElementById('square').addEventListener('click', () => {
    canvas.add(new fabric.Rect({
        strokeWidth: strokeWidth,
        stroke: strokeColor,
        fill: 'transparent',
        width: 50,
        height: 50,
        left: leftCenter,
        top: topCenter
    }));
});

// Circle

document.getElementById('circle').addEventListener('click', () => {
    canvas.add(new fabric.Circle({
        radius: 30,
        strokeWidth: strokeWidth,
        stroke: strokeColor,
        fill: 'transparent',
        left: leftCenter,
        top: topCenter
    }));
});

// Triangle

document.getElementById('triangle').addEventListener('click', () => {
    canvas.add(new fabric.Triangle({
        strokeWidth: strokeWidth,
        stroke: strokeColor,
        fill: 'transparent',
        width: 50,
        height: 50,
        left: leftCenter,
        top: topCenter
    }));
});

//Rectangle

document.getElementById('rectangle').addEventListener('click', () => {
    canvas.add(new fabric.Rect({
        strokeWidth: strokeWidth,
        stroke: strokeColor,
        fill: 'transparent',
        width: 100,
        height: 50,
        left: leftCenter,
        top: topCenter
    }));
});

//Door

document.getElementById('door').addEventListener('click', () => {
    fabric.Image.fromURL('img/door.svg', function (img) {
        canvas.add(img);
    });

});


