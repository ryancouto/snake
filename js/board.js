(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function (dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.snake = new SnakeGame.Snake(
      SnakeGame.Coord.randomPos(this.dimX, this.dimY)
    );
    this.applePos = this.appleGen();
  }

  Board.prototype.appleGen = function () {
    var randomPos = SnakeGame.Coord.randomPos(this.dimX, this.dimY);
    if (SnakeGame.Coord.collidesWithArray(randomPos, this.snake.body)) {
      this.appleGen();
    } else {
      this.applePos = randomPos;
    }
  }




})();
