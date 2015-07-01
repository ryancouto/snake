(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.board = board;
    this.setupBoard();
  }

  View.prototype.setupBoard = function() {
    var $boardEl = this.$el.find('.board');
    for (i = 0; i < this.board.dimX; i++){
      for (var j = 0; j < this.board.dimY; j++){
        var el = $("<li></li>");
        if (SnakeGame.Coord.equals([i,j], this.board.snake.head())){
          $boardEl.addClass("snake");
        }
        $boardEl.append(el);
      }
    }
  }

  // View.prototype.installListeners = function() {
  //
  // }


})();
