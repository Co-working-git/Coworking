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


//all the costum furniture
document.getElementById('microwave').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/microwave.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('fridge').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/fridge.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('furnace').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/furnace.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('countertop').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/countertop.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('couchBig').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/couchBig.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('couch').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/couch.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('tv').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/tv.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('table').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/table.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('tableSmall').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/tableSmall.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bookcase').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bookcase.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('speaker').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/speaker.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('lamp').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/lamp.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('closet').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/closet.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bedsideTable').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bedsideTable.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('desk').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/desk.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bedLarge').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bedLarge.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bed').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bed.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bedFancyLarge').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bedFancyLarge.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('washingMachine').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/washingMachine.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('dryer').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/dryer.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bath').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bath.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('counterWithSink').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/counterWithSink.png', function (img) {
        canvas.add(img);
    });
});
document.getElementById('toilet').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/toilet.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('sink').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/sink.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('shower').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/shower.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('radio').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/radio.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('computerScreen').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/computerScreen.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('computer').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/computer.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('deskWithComputer').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/deskWithComputer.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('printer').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/printer.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('car').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/car.png', function (img) {
        canvas.add(img);
    });
});

document.getElementById('bike').addEventListener('click', () => {
    fabric.Image.fromURL('img/assets/bike.png', function (img) {
        canvas.add(img);
    });
});








