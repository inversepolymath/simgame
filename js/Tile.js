function Tile(owner, type, r, c){
  this.owner = owner;
  this.type = type;
  this.r = r;
  this.c = c;

  this.update = function(){
    this.x = r*gridSize+startDrawX;
    this.y = c*gridSize+startDrawY;
  }

  this.draw = function(){
    strokeWeight(1);
    fill(255,255,255)
    stroke(175 ,175,175)
    if (this.type == 1){
      fill(0,0,0);
    }
    square(this.x,this.y, gridSize);
  }

}
