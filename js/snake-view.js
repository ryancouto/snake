(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.board = board;
    this.setupBoard();
    this.started = false;
  }

  View.prototype.setupBoard = function() {
    var $boardEl = this.$el.find('.board');
    for (i = 0; i < this.board.dimX; i++){
      for (var j = 0; j < this.board.dimY; j++){
        var $liEl = $("<li></li>");
        if (SnakeGame.Coord.equals([i,j], this.board.snake.head())){
          $liEl.addClass("snake");
        } else if (SnakeGame.Coord.equals([i,j], this.board.applePos)){
          $liEl.addClass("apple");
        }
        $boardEl.append($liEl);
      }
    }
  }

  View.prototype.bindKeyHandlers = function () {
    var snake = this.board.snake;
    key('left', function() {
      snake.turn('W');
    })
    key('right', function() {
      snake.turn('E');
    })
    key('up', function() {
      snake.turn('S');
    })
    key('down', function() {
      snake.turn('N');
    })
  }

  View.prototype.start = function(dir) {
    if (this.started) { return; }
    this.started = true;
    var board = this.board;
    board.snake.dir = dir;

    this.bindKeyHandlers();

    setInterval(function (){
      board.step();
      console.log("step!")
      if (board.lose()) {
        alert("You lose!");
      }
    }, 500);

  }

  // View.prototype.installListeners = function() {
  //
  // }


})();
