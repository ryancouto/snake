(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (headPos) {
    this.body = [headPos];
    this.dir = undefined;
  }

  Snake.prototype.move = function () {
    var nextHeadPos = SnakeGame.Coord.plus(this.body[0], this.dir);
    var x = this.body.unshift(nextHeadPos);
    var y = this.body.pop();
  }

  Snake.prototype.turn = function(newDir) {
    if (SnakeGame.Coord.opposite(this.dir, newDir)) { return; }
    this.dir = newDir;
  }

  Snake.prototype.collidedWithSelf = function() {
    return SnakeGame.Coord.collidesWithArray(this.head(), this.tail());
  }

  Snake.prototype.head = function() {
    return this.body[0];
  }

  Snake.prototype.tail = function() {
    return this.body.slice(1);
  }

  Snake.prototype.eat = function () {
    this.body.push([null, null]);
  }


})();
