function extendDeep(parent, child) {
  var i;
  var child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === 'object') {
        child[i] = Object.prototype.toString.call(parent[i]) === '[object Array]' ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}

var a = {
  count: [1, 2, 3],
  reads: {paper: true},
}

var b = extendDeep(a, {});

b.count.push(4);
console.log(a.count);