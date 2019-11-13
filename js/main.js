let map = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]


let lines = [];
let drawLine = 0;
let selectOptVal = 0;
let drawLineData = [];
let gridSize = 40;
let d;
let rows = 15;
let cols = 15;
let showMenuMap;
let mouseVector;
let startDrawX
let startDrawY;
let mouseLocked;
let xOffset;
let yOffset;
let rowData = [];
let colData = [];
let gridData = [];


function setup() {
  cnv = createCanvas(600, 600);
  cnv.mouseWheel(changeSize);
  d = 40;
  showMapMenu = 0;
  menuMap();
  startDrawX = 0;
  startDrawY = 0;
  mouseLocked = false;

  //init grid
  for (i = 0; i < cols; i++){
    colData = [];
    for (j = 0; j < rows; j++){
      append(colData, new Tile(0, 0, j, i));
    }
    append(rowData, colData);
  }
  append(gridData, rowData);
}

function draw() {
  gridSize = d;
  background(220);

  for (i = 0; i < gridData[0].length; i++){
    for (j = 0; j < gridData[0][i].length; j++){
      gridData[0][i][j].update();
      gridData[0][i][j].draw();

    }
  }

  for (l = 0; l < lines.length; l++){
    lines[l].update();
    lines[l].delete(mouseX, mouseY);
    lines[l].show();
  }
}

function mouseWheel() {
}

function mouseDragged() {
  if (mouseLocked && selectOptVal == 0) {
    move('mouse');
  }
}

function mousePressed(){
  mouseLocked = true;
  xOffset = mouseX - startDrawX;
  yOffset = mouseY - startDrawY;

  for (l = 0; l < lines.length; l++){
    if(lines[l].delete(mouseX, mouseY)){
      lines.splice(l, 1);
    }
  }

  for (i = 0; i < gridData[0].length; i++){
    for (j = 0; j < gridData[0][i].length; j++){
      var x = i*gridSize;
      var y = j*gridSize;
      if (mouseX-startDrawX > x && mouseX-startDrawX < (x + gridSize) && mouseY-startDrawY > y && mouseY-startDrawY < (y + gridSize) && showMenuMap == 0) {
        console.log("clicked " + x + "," + y);
        if(selectOptVal == 1){
          gridData[0][j][i].type = 1;
        }else if(selectOptVal == 2){
          if(drawLine == 0){
            drawLine = 1;
            append(drawLineData, i);
            append(drawLineData, j);
          }else{
            append(drawLineData, i);
            append(drawLineData, j);
            drawLine = 0;
            console.log(drawLineData);
            // append(lines, drawLineData);
            append(lines, new connectorLine(1, drawLineData));
            console.log(lines);
            drawLineData = [];
          }
        }
      }
    }
  }
}

function move(dir, amt=0){
  console.log(mouseX + "," + mouseY);
  console.log(startDrawX + "," + startDrawY);
  console.log(rows-1*gridSize-(gridSize*3));

  if(dir == 'up'){
    if(startDrawY - amt <= (cols-1*gridSize*3)){
      startDrawY = (cols-1*gridSize*3);
    }else{
      startDrawY = startDrawY - amt;
    }
  }else  if(dir == 'down'){
    if(startDrawY + amt < (gridSize)){
      startDrawY = gridSize;
    }else{
      startDrawY = startDrawY + amt;
    }
  }else
   if(dir == 'mouse'){
     if(mouseX - xOffset >= (gridSize*3)){
       startDrawX = (gridSize*3);
     }else if(mouseX - xOffset <= (rows-1*gridSize*3)){
       // startDrawX = ((rows-1)*gridSize);
     }else{
       startDrawX = mouseX - xOffset;
     }
    if(mouseY - yOffset >= (gridSize*3)){
      startDrawY = (gridSize*3);
    }else if(mouseY - yOffset <= (cols-1*gridSize*3)){
      // startDrawY = (cols-1*gridSize);
    }else{
      startDrawY = mouseY - yOffset;
    }
  }
}

function keyPressed() {
  if (keyCode === 77) {
    showMenuMap = 1;
  } else  if (keyCode === UP_ARROW) {
    move('up', 10);
  } else if (keyCode === DOWN_ARROW) {
   startDrawY = startDrawY + 10;
  }
  if (keyCode === LEFT_ARROW) {
    startDrawX = startDrawX - 10;
  } else if (keyCode === RIGHT_ARROW) {
    startDrawX = startDrawX + 10;
  }
}

function menuMap(){
  optSquare = createButton('Square');
  optSquare.mousePressed(function() {selectOpt(1);});

  optLine = createButton('Line');
  optLine.mousePressed(function() {selectOpt(2);});

  optLine = createButton('Move');
  optLine.mousePressed(function() {selectOpt(0);});
}

function selectOpt(opt){
  selectOptVal = opt;
  showMenuMap = 0;
  console.log(showMenuMap);
}

function changeSize(event) {
  if (event.deltaY > 0) {
    if(d < 80){
      d = d + 5;
    }
  } else {
    if(d >= 25){
      d = d - 5;
    }
  }
}
