// ======Classical Pattern #1—The Default Pattern=======
function inherit(C, P) {
  C.prototype = new P(); 
}
// Drawbacks When Using Pattern #1
// One drawback of this pattern is that you inherit both own properties added to this and prototype properties. 
// Most of the time you don’t want the own properties, because they are likely to be specific to one 
// instance and not reusable.

// =======Classical Pattern #2—Rent-a-Constructor=========
function Child(a, c, b, d) {
  Parent.apply(this, arguments); 
}

// the parent constructor 
function Parent(name) {
  this.name = name || 'Adam'; 
}
// adding functionality to the prototype 
Parent.prototype.say = function () {
  return this.name; 
};
// child constructor 
function Child(name) {
  Parent.apply(this, arguments);
}
var kid = new Child("Patrick"); kid.name; // "Patrick"
typeof kid.say; // "undefined"

// =========Classical Pattern #3—Rent and Set Prototype===========
function Child(a, c, b, d) {
  Parent.apply(this, arguments); 
}
Child.prototype = new Parent();

// ==========Classical Pattern #4—Share the Prototype==========
function inherit(C, P) {
  C.prototype = P.prototype; 
}

// =============Classical Pattern #5—A Temporary Constructor==========
function inherit(C, P) {
  var F = function () {}; 
  F.prototype = P.prototype; 
  C.prototype = new F();
  C.uber = P.prototype;
  C.prototype.constructor = C;
}

var inherit = (function () { 
  var F = function () {}; 
  return function (C, P) {
    F.prototype = P.prototype; 
    C.prototype = new F(); 
    C.uber = P.prototype; 
    C.prototype.constructor = C;
  } 
}());
