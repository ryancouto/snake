(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.board = board;
    this.setupGame();
    this.start();
    this.bindKeyHandlers();
  }

  View.prototype.setupGame = function () {
    this.board.setup();
    this.gameOver = false;
    this.paused = false;
    this.setupBoard();
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
    this.appleSymbol();
    this.render;
  },

  View.prototype.appleSymbol = function () {
    this.appleSyms = {
      'pi': 3.1415926535,
      'phi': 1.6180339887,
      'psi': 3.3598856662,
      'e': 2.7182818284
    }

    var count = 0;
    for (var prop in this.appleSyms)
        if (Math.random() < 1/++count)
           this.symbol = prop;
    return this.symbol;
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
    key('space', function () {
      if (view.gameOver) {
        view.setupGame();
      } else {
        view.togglePause();
      }
    })
  },

  View.prototype.togglePause = function () {
    this.paused = this.paused ? false : true;
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
      if (this.paused) {
        return;
      }
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
    this.renderPos(this.board.applePos, 'apple ');
    this.$apple = this.$el.find('.apple')
    debugger
    this.renderScore();
  },

  View.prototype.renderScore = function () {
    var score = ((this.board.snake.body.length - 1) * Math.PI).toString();
    this.$el.find('.score').html(score.slice(0,10));
  },

  View.prototype.handleLoss = function () {
    this.board.snake.dir = undefined;
    this.moveDir = undefined;
    this.gameOver = true;
    this.$el.find('.loss').addClass('visible')
  }


})();
