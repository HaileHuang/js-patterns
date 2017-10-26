// =======Namespace Pattern========
var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) { 
  var parts = ns_string.split('.'),
      parent = MYAPP, i;
  // strip redundant leading global 
  if (parts[0] === "MYAPP") {
    parts = parts.slice(1); 
  }
  for (i = 0; i < parts.length; i += 1) {
  // create a property if it doesn't exist
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {}; 
    }
    parent = parent[parts[i]]; 
  }
  return parent; 
};
// assign returned value to a local var
var module2 = MYAPP.namespace('MYAPP.modules.module2'); 
module2 === MYAPP.modules.module2; // true
// skip initial `MYAPP` 
MYAPP.namespace('modules.module51');
// long namespace 
MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');

// ========Declaring Dependencies=========
function test2() {
  var modules = MYAPP.modules; 
  alert(modules.m1); alert(modules.m2); 
  alert(modules.m51);
}

// ======Private Properties and Methods========
function Gadget() {
  // private member
  var name = 'iPod';
  // public function 
  this.getName = function () {
    return name; 
  };
}
Gadget.prototype = (function () { 
  // private member
  var browser = "Mobile Webkit"; 
  // public prototype members 
  return {
    getBrowser: function () {
      return browser; 
    }
  }; 
}());
var toy = new Gadget();
console.log(toy.getName()); // privileged "own" method 
console.log(toy.getBrowser()); // privileged prototype method

// =========Module Pattern==========
MYAPP.utilities.array = (function () {
  // private properties
  var array_string = "[object Array]",
      ops = Object.prototype.toString,
      // private methods
      inArray = function (haystack, needle) {
        for (var i = 0, max = haystack.length; i < max; i += 1) { 
            if (haystack[i] === needle) {
                return i; 
            }
        }
        return −1; 
      },
      isArray = function (a) {
        return ops.call(a) === array_string; 
      };
      // end var
  // revealing public API
  return {
    isArray: isArray,
    indexOf: inArray 
  };
}());

