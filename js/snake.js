(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (headPos) {
    this.body = [headPos];
    this.dir = undefined;
  }

  Snake.prototype.move = function () {
    var nextHeadPos = SnakeGame.Coord.add(this.body[0]. this.dir);
    this.body.pop();
    this.body.unshift(nextHeadPos);
  }

  Snake.prototype.turn = function(newDir) {
    if (SnakeGame.Coord.opposite(this.dir, newDir)) { return; }
    this.dir = newDir;
  }

  Snake.prototype.collided = function() {
    return this.body.slice(1).some( function(el) {
      return SnakeGame.Coord.equals(el, this.body[0]);
    }.bind(this));
  }

  
})();
