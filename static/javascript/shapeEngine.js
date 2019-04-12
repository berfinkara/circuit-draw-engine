var canvas,
    context;

var dragging = false;
var movingComponent = false;

var dragPoints = [];
var drawedShapes = [];

var components = [];
var selectedComponent;
var wireColorSelectBox,wireColor;

var clickedImageMousePosition;

function makePoint(x,y){
    return {x:x, y:y};
}

function getCanvasCoordinates(event){
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
    return makePoint(x,y);
}


function drawLineByArray(){
    solder(dragPoints[0]);
    context.beginPath();
    wireColor =  wireColorSelectBox.options[wireColorSelectBox.selectedIndex].value;
    context.strokeStyle  = wireColor;
    for(var i=1;i<dragPoints.length;i++){
        context.moveTo(dragPoints[i-1].x,dragPoints[i-1].y);
        context.lineTo(dragPoints[i].x,dragPoints[i].y);
        context.stroke();
    }
}

function clickPoint(event){
    drawLastContext();
    var currentPosition = getCanvasCoordinates(event);
    for(var i=0;i<components.length;i++){
        if(currentPosition.x > components[i].location.x &&
                currentPosition.x < ((components[i].location.x + components[i].width) * 0.95) &&
                currentPosition.y > components[i].location.y &&
                currentPosition.y < ((components[i].location.y + components[i].height)*0.95) &&
                dragging == false
            ){
            console.log("you click image");
            clickedImageMousePosition = makePoint(currentPosition.x-components[i].location.x,
                                                currentPosition.y-components[i].location.y);
            movingComponent = true;
            selectedComponent = i;
        }
    }

    //draw cable
    if(movingComponent == false){
        dragging = true;
        dragPoints.push(currentPosition);
        drawLineByArray();
    }
}

function drag(event){
    if(dragging){
        drawLastContext();
        drawLineByArray();
        drawTempLine(event);
    }
    else if(movingComponent){
        var currentPosition = getCanvasCoordinates(event);
        console.log("x: ",currentPosition.x-clickedImageMousePosition.x);
        console.log("y: ",currentPosition.y-clickedImageMousePosition.y);
        components[selectedComponent].location = makePoint(currentPosition.x-clickedImageMousePosition.x,
            currentPosition.y-clickedImageMousePosition.y);
        drawLastContext();
    }
}

function dragStop(event){
    dragging = false;
    drawLineByArray();
    drawedShapes.push(new WireClass(drawedShapes.length,dragPoints,wireColor));
    dragPoints = [];
    drawLastContext();
    var currentPosition = getCanvasCoordinates(event);

    //select
    var onMouseColor = context.getImageData(currentPosition.x,currentPosition.y,1,1);
    console.log(onMouseColor);
}

function movingComponentStop(event){
    movingComponent = false;
    drawLastContext();
}

function drawTempLine(event){
    context.moveTo(dragPoints[dragPoints.length-1].x,dragPoints[dragPoints.length-1].y);
    var currentPosition = getCanvasCoordinates(event);
    context.lineTo(currentPosition.x,currentPosition.y);
    context.stroke();
}


function drawComponents(){
    for(var i=0;i<components.length;i++){
        var component = new Image();
        component.src = components[i].imgSrc;
        component.crossOrigin = 'anonymous';
        context.drawImage(component,components[i].location.x,components[i].location.y,
            components[i].width,components[i].height);
    }
}

function addComponent(){
    var componentSelectBox = document.getElementById("componentSelectBox");
    var selectedComponent = componentSelectBox.options[componentSelectBox.selectedIndex].value;

    var component;
    if(selectedComponent == 0){
        component = new Component(0,'asset/boards/raspberrypi.jpg',makePoint(5,7),400,300);
    }else if(selectedComponent == 1){
        component =  new Component(0,'asset/boards/ArduinoUno.png',makePoint(100,100),400,300);
    }
    components.push(component);
    drawLastContext();
}



function solder(solderPosition){
    var circleRadius = 4;

    context.save();

    context.lineJoin = "round";
    context.beginPath();
    context.rect(solderPosition.x-(circleRadius/2),solderPosition.y-(circleRadius/2),circleRadius,circleRadius);
    context.strokeStyle = "#616161";
    context.fillStyle = "#616161";
    context.fill();
    context.stroke();


    context.restore();
}

function drawShapeByArray(drawedShape){
    var drawedShapeArray = drawedShape.getShape();
    var id = drawedShape.getId();
    var drawedColor = drawedShape.color;

    for(var i=1;i<drawedShapeArray.length;i++){
        context.beginPath();
        context.strokeStyle = drawedColor;
        context.moveTo(drawedShapeArray[i-1].x,drawedShapeArray[i-1].y);
        context.lineTo(drawedShapeArray[i].x,drawedShapeArray[i].y);
        context.stroke();
    }

    solder(drawedShapeArray[0]);
    solder(drawedShapeArray[drawedShapeArray.length-1]);
}

function drawLastContext(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawComponents();
    for(var i=0;i<drawedShapes.length;i++){
        drawShapeByArray(drawedShapes[i]);
    }
}


function init(){
    canvas = document.getElementById("microcomputer_canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = 'purple';
    context.lineWidth = 3;
    context.lineCap = 'round';

    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    wireColorSelectBox = document.getElementById("wireColorSelectBox");

    canvas.addEventListener('mousedown',clickPoint,false);
    canvas.addEventListener('mousemove',drag,false);
    canvas.addEventListener('contextmenu',dragStop,false);
    canvas.addEventListener("mouseup",movingComponentStop,false);

    drawLastContext();
}

//window.addEventListener('load',init,false);
init();

































