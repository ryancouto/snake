(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Coord = window.SnakeGame.Coord = {};

  var Coord.plus = function(pos, dir) {
    var nextPos = pos;

    switch (dir){
      case 'N':
        nextPos[1] += 1;
        break;
      case 'S':
        nextPos[1] -= 1;
        break;
      case 'E':
        nextPos[0] += 1;
        break;
      case 'W':
        nextPos[0] -= 1;
        break;
    }

    return nextPos;
  }

  var Coord.equals = function(thisPos, otherPos) {
    return (thisPos[0] === otherPos[0] && thisPos[1] === otherPos[1]);
  }

  var Coord.opposite = function (thisDir, thatDir) {
    switch (thisDir) {
      case 'N':
        return thatDir === 'S';
        break;
      case 'S':
        return thatDir === 'N';
        break;
      case 'E':
        return thatDir === 'W';
        break;
      case 'W':
        return thatDir === 'E';
        break;
    }
  }

  var Coord.randomPos = function (dimX, dimY) {
    return [
      Math.floor(Math.random() * dimX),
      Math.floor(Math.random() * dimY)
    ];
  }

})
