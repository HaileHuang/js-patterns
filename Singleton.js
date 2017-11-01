// Instance in a Static Property
function Universe() {
  // do we have an existing instance?
  if (typeof Universe.instance === "object") {
    return Universe.instance; 
  }

  // proceed as normal 
  this.start_time = 0;
  this.bang = "Big";

  // cache 
  Universe.instance = this;

  // implicit return:
  // return this;
}

var uni1 = new Universe();
var uni2 = new Universe();
console.log(uni1 === uni2);

// Instance in a Closure
function Universe() {
  // the cached instance
  var instance = this;
  
  // proceed as normal
  this.start_time = 0;
  this.bang = "big";
  
  // rewrite the constructor, Universe changed
  Universe = function() {
    return instance;
  }
}

uni1 = new Universe();
uni2 = new Universe();
console.log(uni1 === uni2);

// adding to the prototype 
Universe.prototype.nothing = true;
uni1 = new Universe();
// again adding to the prototype
// after the initial object is created 
Universe.prototype.everything = true;
uni2 = new Universe();

uni1.nothing; // true 
uni2.nothing; // true 
uni1.everything; // undefined 
uni2.everything; // undefined
// that sounds right: 
uni1.constructor.name; // "Universe"
// but that's odd:
uni1.constructor === Universe; // false

function Universe() {
  // the cached instance
  var instance;

  // rewrite the constructor
  Universe = function Universe() {
    return instance;
  };

  // carry over the prototype properties
  Universe.prototype = this;

  // the instance
  instance = new Universe();

  // reset the constructor pointer
  instance.constructor = Universe;

  // all the functionality
  instance.start_time = 0;
  instance.bang = 'big';

  return instance;
}

// immediate function
var Universe;
(function () {
  var instance;
  Universe = function Universe() {
    if (instance) {
      return instance;
    }
    instance = this;

    this.start_time = 0;
    this.bang = "big";
  };
}());