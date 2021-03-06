(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.board = board;
    this.bindKeyHandlers();
    this.setupGame();
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
    key('space', function () {
      if (view.gameOver) {
        view.setupGame();
        view.$el.find('.restart-screen').addClass('hidden')
        view.gameOver = false;
        view.$el.find('.start-screen').removeClass('hidden')
      } else if (view.board.snake.dir !== undefined){
        view.togglePause();
      } else {
        view.moveDir = 'S';
        view.$el.find('.start-screen').addClass('hidden');
        view.start();
      }
    });
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
    var pauseScreen = this.$el.find('.pause-screen');
    var startScreen = this.$el.find('.start-screen');
    var board = this.board;
    this.interval = setInterval(function (){
        if (this.paused) {
          pauseScreen.removeClass('hidden');
          return;
        } else {
          board.snake.turn(this.moveDir);
          this.$el.find('.snake-head').addClass(this.moveDir)
          if (board.snake.dir !== undefined) {
            if (!pauseScreen.hasClass('hidden')) {
              pauseScreen.addClass('hidden');
            }
            if (!startScreen.hasClass('hidden')) {
              startScreen.addClass('hidden');
            }
            board.step();
            if (board.lose()) {
              this.handleLoss();
            } else {
              this.render();
            }
          }
        }
      }.bind(this), 70);
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
    this.$el.find('.restart-screen').removeClass('hidden');
    window.clearInterval(this.interval)

  }


})();
