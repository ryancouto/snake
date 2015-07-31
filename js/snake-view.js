(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.$restart = $el.find('.restart');
    this.$restart.on('click', 'button', this.setupGame.bind(this));
    this.board = board;
    this.setupGame();
    this.start();
    this.bindKeyHandlers();
  }

  View.prototype.setupGame = function () {
    this.board.setup();
    this.gameOver = false;
    this.setupBoard();
    this.$el.find('.loss').removeClass('visible')
    this.render();
  },

  View.prototype.setupBoard = function() {
    var $boardEl = this.$el.find('.board');
    $boardEl.empty();

    for (var i = 0; i < this.board.dimX; i++){
      for (var j = 0; j < this.board.dimY; j++){
        var $liEl = $("<li></li>");
        $boardEl.append($liEl);
      }
    }
    this.$boardEls = this.$el.find('.board li');
    this.render;
  },

  View.prototype.bindKeyHandlers = function () {
    var view = this;
    key('left', function() {
      view.changeDir('W');
    })
    key('right', function() {
      view.changeDir('E');
    })
    key('up', function() {
      view.changeDir('S');
    })
    key('down', function() {
      view.changeDir('N');
    })
  },

  View.prototype.changeDir = function (dir) {
    if (this.gameOver) return;
    var snakeDir = this.board.snake.dir;

    if(!SnakeGame.Coord.opposite(snakeDir, dir)) {
      this.moveDir = dir;
    }
  },

  View.prototype.start = function() {
    var board = this.board;
    setInterval(function (){
      board.snake.turn(this.moveDir);
      this.$el.find('.snake-head').addClass(this.moveDir)
      if (board.snake.dir !== undefined) {
        board.step();
        if (board.lose()) {
          this.handleLoss();
        } else {
          this.render();
        }
      }
    }.bind(this), 100);
  },

  View.prototype.renderPos = function (pos, clas) {
    if (pos[0] === null) { return; }
    var idx = pos[0] + this.board.dimY * pos[1];
    this.$boardEls.eq(idx).addClass(clas);
  },

  View.prototype.render = function () {
    this.$boardEls.removeClass('snake apple snake-head N S E W');
    var snake = this.board.snake;

    this.renderPos(snake.head(), 'snake-head' + ' ' + snake.dir)
    snake.tail().forEach( function(tailPos) {
      this.renderPos(tailPos, "snake")
    }.bind(this));
    this.renderPos(this.board.applePos, 'apple');
    this.renderScore();
  },

  View.prototype.renderScore = function () {
    var score = this.board.snake.body.length;
    this.$el.find('.score').html(score);
  },

  View.prototype.handleLoss = function () {
    this.board.snake.dir = undefined;
    this.moveDir = undefined;
    this.gameOver = true;
    this.$el.find('.loss').addClass('visible')
  }


})();
