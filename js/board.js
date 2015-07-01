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
  }

  


})();
