if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function (thisArg) {
    var fn = this;
    var slice = [].slice;
    var params = slice.call(arguments, 1);
    return function () {
      return fn.apply(thisArg, params.concat(slice.call(arguments)));
    }
  }
}

var one = {
  name: "object",
  say: function say (greet) {
    return greet + ", " + this.name; 
  }
};
var two = {
  name: "another object",
};
var twosay2 = one.say.bind(two); 
console.log(twosay2('Bonjour')); // "Bonjour, another object"

var twosay3 = one.say.bind(two, 'Enchanté');
twosay3(); // "Enchanté, another object"