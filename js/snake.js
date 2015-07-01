(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Snake = function (headPos) {
    this.body = [headPos];
    this.dir = undefined;
  }
})();
