function connectorLine(owner, position){
  this.owner = owner;
  this.position = position;

  this.update = function(){
    this.startX = this.position[0]*gridSize+(gridSize/2)+startDrawX;
    this.startY = this.position[1]*gridSize+(gridSize/2)+startDrawY;
    this.endX = this.position[2]*gridSize+(gridSize/2)+startDrawX;
    this.endY = this.position[3]*gridSize+(gridSize/2)+startDrawY;
  }

  this.delete = function(mx, my) {
    // http://www.jeffreythompson.org/collision-detection/line-point.php
    var d1 = dist(mx, my, this.startX, this.startY);
    var d2 = dist(mx, my, this.endX, this.endY);
    var lineLen = dist(this.startX, this.startY, this.endX, this.endY);
    var buffer = 0.1;

    if(d1+d2 >= lineLen - buffer && d1+d2 <= lineLen+buffer){
      stroke(0,255,0);
      return true;
    }else{
      stroke(255,0,0);
      return false;
    }
  }


  this.show = function(){
    console.log(gridSize);
    strokeWeight(3);
    line(this.startX, this.startY, this.endX, this.endY);
  }
}
