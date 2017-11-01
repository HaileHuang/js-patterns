var agg = (function () {
  var index = 0;
  var data = [1, 2, 3, 4, 5, 6];
  var len = data.length;

  return {
    next: function () {
      if (!this.hasNext()) {
        return null;
      }
      var tmp = data[index];
      index += 1;
      return tmp;
    },
    hasNext: function () {
      return index < len;
    },
    rewind: function () {
      index = 0;
    },
    current: function () {
      return data[index];
    }
  }
}())