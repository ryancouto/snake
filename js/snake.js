(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (headPos) {
    this.body = [headPos];
    this.dir = undefined;
  }


})();
