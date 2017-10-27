var klass = function(Parent, props) {

  // new constructor
  var Child = function () {
    if (Child.uber && Child.uber.hasOwnProperty("__construct")) {
      Child.uber.__construct.apply(this, arguments)
    }
    if (Child.prototype.hasOwnProperty("__construct")) {
      Child.prototype.__construct.apply(this, arguments)
    }
  }
  
  // inherit
  Parent = Parent || Object;
  var F = function (){}
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;

  // add implementation methods
  var i;
  for (i in props) {
    if (props.hasOwnProperty(i)) {
      Child.prototype[i] = props[i];
    }
  }

  return Child;
}

var Man = klass(null, { 
  __construct: function (what) {
    console.log("Man's constructor");
    this.name = what; 
  },
  getName: function () {
    return this.name; 
  }
});

var SuperMan = klass(Man, { 
  __construct: function (what) {
    console.log("SuperMan's constructor"); 
  },
  getName: function () {
    var name = SuperMan.uber.getName.call(this);
    return "I am " + name; 
  }
});

var clark = new SuperMan('Clark Kent');
console.log(clark.getName()); // "I am Clark Kent"
