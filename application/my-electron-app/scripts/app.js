
	var canvas = new fabric.Canvas('canvas', {
		selection: false
	});
	var grid = 25;


// create grid
	function createGrid(){
		for (var i = 0; i < (3000 / grid); i++) {
			canvas.add(new fabric.Line([i * grid, 0, i * grid, canvas.height], {
				stroke: '#ccc',
				selectable: false
			}));
			canvas.add(new fabric.Line([0, i * grid, canvas.width, i * grid], {
				stroke: '#ccc',
				selectable: false
			}))
		}
	}
	//create the grid when the app loads :)
	createGrid();
// Resize canvas

	const buildZone = document.getElementById('buildZone');
	const wrapper = document.getElementById('wrapper');
	const paddingShift = 60;

	function resizeCanvas() {
		// Width
		const newWidth = canvas.getWidth() + (window.innerWidth - (buildZone.offsetWidth + paddingShift));
		if(newWidth < 640 && newWidth > 200) canvas.setWidth(newWidth);

		// Height
		const newHeight = canvas.getHeight() + (window.innerHeight - (wrapper.offsetHeight + paddingShift));
		if(newHeight < 360 && newHeight > 250) canvas.setHeight(newHeight);
	}

	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();


// Clear canvas - Delete shapes

	document.getElementById('clear').addEventListener('click', () => {
		!deleteActiveObjects() && canvas.clear();
		createGrid();

	});

	document.addEventListener('keydown', (event) => {
		event.keyCode === 46 && deleteActiveObjects();
	})

	function deleteActiveObjects() {
		const activeObjects = canvas.getActiveObjects();
		if(!activeObjects.length) return false;

		if(activeObjects.length) {
			activeObjects.forEach(function(object) {
				canvas.remove(object);
			});
		} else {
			canvas.remove(activeObjects);
		}

		return true;
	}


// SHAPES STYLES  ―――――――――――――――――――――――――

	const styleZone = document.getElementById('styleZone');
	const colors = ['#43c8bf', '#896bc8', '#e54f6b'];
	let defaultColor = colors[0];
	let activeElement = null;
	const isSelectedClass = 'isSelected';

	colors.forEach((color, i) => {
		const span = document.createElement('span');
		span.style.background = color;

		if(i === 0) {
			span.className = isSelectedClass;
			activeElement = span;
		}

		let icon = document.createElement('i');
		icon.className = 'feather icon-check';
		span.appendChild(icon);

		styleZone.appendChild(span);

		span.addEventListener('click', (event) => {
			if(span.className !== isSelectedClass) {
				span.classList.toggle(isSelectedClass);
				activeElement.classList.remove(isSelectedClass);
				activeElement = span;
				strokeColor = color;
			}

			if(canvas.getActiveObject()) {
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

// Square

	document.getElementById('square').addEventListener('click', () => {
		canvas.add(new fabric.Rect({
			strokeWidth: strokeWidth,
			stroke: strokeColor,
			fill: 'transparent',
			width: 50,
			height: 50,
			left: 100,
			top: 100
		}));
	});

// Circle

	document.getElementById('circle').addEventListener('click', () => {
		canvas.add(new fabric.Circle({
			radius: 30,
			strokeWidth: strokeWidth,
			stroke: strokeColor,
			fill: 'transparent',
			left: 100,
			top: 100
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
			left: 100,
			top: 100
		}));
	});

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

