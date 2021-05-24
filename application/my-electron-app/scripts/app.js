var canvas = new fabric.Canvas('canvas', {
    selection: false
});

window.addEventListener('load', 
  function() { 
    //create the grid when the app loads :)
    createGrid();
    console.log(amountGrid);
    window.addEventListener("resize", ResizeScreen);
    window.resizeTo(window.screen.availWidth, window.screen.availHeight); 
    canvas.setDimensions({width: window.innerWidth, height:window.innerHeight});
    function ResizeScreen() {
        canvas.setDimensions({width: window.innerWidth, height:window.innerHeight});
        }
  }, false);

//zooming and panning for the canvas
canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 2) zoom = 2      ;
    if (zoom < 0.10) zoom = 0.10;
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
document.addEventListener('keyup', ({ keyCode, ctrlKey } = event) => {
    // Check Ctrl key is pressed.
    if (!ctrlKey) {
      return
    }

    // Check pressed button is c - Ctrl+c.
    if (event.key == 'c') {
        Copy();
    }

    // Check pressed button is v - Ctrl+v.
    if (event.key == 'v') {
        Paste();
    }
  })


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
                stroke: '#ADADAD',
                selectable: false,
                "evented": false,
                excludeFromExport: true,
                id: 'gridId'
            }))
        }
        for (var i = 0; i < (6000 / grid); i++) {
            canvas.add(new fabric.Line([i * grid, 0, i * grid, 3000], {
                stroke: '#ADADAD',
                selectable: false,
                "evented": false,
                excludeFromExport: true,
                id: 'gridId'
            }));
        }
        console.log("grid was actually added if you can't see it your eyes are broken or our apps doens't work");
        amountGrid++;
        console.log("after extra grid added: " + amountGrid);
        fuckPutItBackIn();
    }
}
function deleteGrid(){
        if(amountGrid == 1){
            canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === 'gridId'){
              canvas.remove(obj);  
            } 
        });
          amountGrid--;  
        }
    console.log("grid deleted");
}

function fuckPutItBackIn() {
    canvas.forEachObject(function(obj) {
        if (obj.id && obj.id === 'gridId') canvas.sendToBack(obj);
    });
}
/*function gridtoggle(){
    canvas.querySelectorAll('gridId').setAttribute(strokeColor) = rgb(255, 255, 255); 

}*/


//information function
canvas.on('selection:created', function () {
    console.log("width: " + canvas.getActiveObject().width);
    console.log("length: " + canvas.getActiveObject().height);
    console.log("depth: " + canvas.getActiveObject().strokeWidth);
    document.getElementById('breedteBlok').innerHTML = "Width: " + canvas.getActiveObject().width/100 + "m";
    document.getElementById('lengteBlok').innerHTML = "Length: " + canvas.getActiveObject().height/100 + "m";
    document.getElementById('diepteBlok').innerHTML = "Depth: " + canvas.getActiveObject().strokeWidth + "cm";
    document.getElementById('kleurBlok').innerHTML = "Color: " + canvas.getActiveObject().stroke;
});
canvas.on('object:modified', function () {
    console.log("width: " + canvas.getActiveObject().width);
    console.log("length: " + canvas.getActiveObject().height);
    console.log("depth: " + canvas.getActiveObject().strokeWidth);
    document.getElementById('breedteBlok').innerHTML = "Width: " + canvas.getActiveObject().width/100 + "m";
    document.getElementById('lengteBlok').innerHTML = "Length: " + canvas.getActiveObject().height/100 + "m";
    document.getElementById('diepteBlok').innerHTML = "Depth: " + canvas.getActiveObject().strokeWidth  + "cm";
    document.getElementById('kleurBlok').innerHTML = "Color: " + canvas.getActiveObject().stroke;
});

//update the width of objects when resizing them

this.canvas.on('object:modified', function (e) {
    var target = e.target;
    if (!target || target.type !== 'rect') {
        return;
    }
    var newWidth = (Math.round(canvas.getActiveObject().getScaledWidth()));
    var newHeight = (Math.round(canvas.getActiveObject().getScaledHeight()));
    canvas.getActiveObject().set({ width: parseInt(newWidth-canvas.getActiveObject().strokeWidth), height: parseInt(newHeight-canvas.getActiveObject().strokeWidth), scaleX: parseInt(1), scaleY: parseInt(1), });
});


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
document.addEventListener('keyup', ({ keyCode, ctrlKey } = event) => {
    if (event.key == 'Delete') {
        !deleteActiveObjects() && canvas.clear();
        createGrid();
    }
  })
  
document.getElementById('clear').addEventListener('click', () => {
    !deleteActiveObjects() && canvas.clear();
    createGrid();
    
});

function deleteActiveObjects() {
    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects.length) {
        
       let antwoord = confirm("Are you sure you want to remove all elements?");
        if(antwoord === false){
            return true;
        }
        else{
            amountGrid--;
        return false;
        }
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
      createGrid();
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



/*puts grid behind objects*/
   function fuckPutItBackIn() {
    canvas.forEachObject(function(obj) {
        if (obj.id && obj.id === 'gridId') canvas.sendToBack(obj);
    });
}





