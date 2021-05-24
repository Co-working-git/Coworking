// SHAPES CREATION  ―――――――――――――――――――――――――
let defaultColor = '#000000';
let strokeWidth = 2;
let strokeColor = defaultColor;
let leftCenter = window.innerWidth / 2 - 25;
let topCenter = window.innerHeight / 2 - 25;

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
        top: topCenter,
        strokeUniform: true
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
        top: topCenter,
        strokeUniform: true
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
        top: topCenter,
        strokeUniform: true
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
        top: topCenter,
        strokeUniform: true
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
        top: topCenter,
        strokeUniform: true
    }));
});

//Door

document.getElementById('door').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/door.svg', function (img) {
        canvas.add(img);
    });

});

//Window

document.getElementById('window').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/window.svg', function (img) {
        canvas.add(img);
    
    });

});

//Staircase

document.getElementById('staircase').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/staircase.png', function (img) {
        canvas.add(img);
    
    });

});
//all the costum furniture
document.getElementById('microwave').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/NGZWD277/microwave1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('fridge').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/0N9nZPBC/fridge1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('furnace').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/SssrFVq2/furnace1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('countertop').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/pdvG7Dpz/countertop1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('couchBig').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/Wzzf8Tty/couch-Big1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('couch').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/851YFhGN/couch1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('tv').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/8cLwtcNt/tv1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('table').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/cJJ90dBL/table1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('tableSmall').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/tvTable1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bookcase').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/xCYwKwvr/bookcase1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('speaker').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/speaker1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('lamp').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/dQhbGjdV/lamp1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('closet').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/tC7Lttxg/closet1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bedsideTable').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/YCLBkfrP/bedside-Table1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('desk').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/XqrQFLzS/desk1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bedLarge').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/J4nWYC9M/bed-Large1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bed').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/mDssmzG5/bed1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bedFancyLarge').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/gkTbfBWR/bed-Fancy-Large1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('washingMachine').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/washingMachine1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('dryer').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/VLbKk7tX/dryer1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bath').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/4xjZh22Z/bath1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('counterWithSink').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/V6pHK2ML/sink1.png', function (img) {
        canvas.add(img);
    });
});
document.getElementById('toilet').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/bwpVVxGb/toilet1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('sink').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/sink1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('shower').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/3RdcC3kc/shower1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('radio').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/radio.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('computer').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/xT7BsJv3/computer1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('printer').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/printer1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('car').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/RCgkHbq8/Car-Black.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('garageDoor').addEventListener('click', () => {
    fabric.Image.fromURL('https://i.postimg.cc/rmP98WFh/garage-Door1.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bike').addEventListener('click', () => {
    fabric.Image.fromURL('https://sanderspaas.ikdoeict.be/Spacify/ElectronImg/bike.png', function (img) {
        canvas.add(img);
    });
});
