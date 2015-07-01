(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function (dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
    var randomPos = [
      Math.floor(Math.random() * dimX), Math.floor(Math.random() * dimY)
    ];
    this.snake = new SnakeGame.Snake(randomPos);
    this.applePos = this.appleGen();
  }

  Board.prototype.appleGen = function () {
    var randomPos = [
      Math.floor(Math.random() * dimX), Math.floor(Math.random() * dimY)
    ];
    if (this.snake.body.some( function (bodyEl) {
      return (SnakeGame.Coord.equals(randomPos, bodyEl))
    })) {
      this.appleGen();
    } else {
      this.applePos = randomPos;
    }
  }




})();
