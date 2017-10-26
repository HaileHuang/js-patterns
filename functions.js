// =====callback pattern======
var findNodes = function (callback) {
  var i = 100000,
      nodes = [],
      found;
  // check if callback is callable
  if (typeof callback !== "function") {
    callback = false; 
  }
  while (i) { 
    i -= 1;
    // complex logic here...
    // now callback: if (callback) {
    callback(found);
  }
    nodes.push(found);
  }
  return nodes;
};
// a callback function
var hide = function (node) {
  node.style.display = "none";
};
// find the nodes and hide them as you go findNodes(hide);

// ========Returning Functions=====
var setup = function () { 
  alert(1);
  return function () {
    alert(2); 
  };
};
// using the setup function 
var my = setup(); // alerts 1 
my(); // alerts 2

//  =======Self-Defining Functions=======
var scareMe = function () { 
  alert("Boo!");
  scareMe = function () {
    alert("Double boo!"); 
  };
};
// using the self-defining function 
scareMe(); // Boo!
scareMe(); // Double boo!

// ======Immediate Functions======
(function () { 
  alert('watch out!');
}());

// ======Immediate Object Initialization======
({
  // here you can define setting values 
  // a.k.a. configuration constants maxwidth: 600,
  maxheight: 400,
  // you can also define utility methods g
  immeMax: function () {
    return this.maxwidth + "x" + this.maxheight; 
  },
  // initialize 
  init: function () {
    console.log(this.gimmeMax());
  // more init tasks... 
  }
}).init();

// ===========Function Properties—A Memoization Pattern========
var myFunc = function () {
  var cachekey = JSON.stringify(Array.prototype.slice.call(arguments)),
  result;
  if (!myFunc.cache[cachekey]) { 
    result = {};
  // ... expensive operation ...
    myFunc.cache[cachekey] = result; 
  }
  return myFunc.cache[cachekey]; 
};
// cache storage 
myFunc.cache = {};

// =========Currying=========
function schonfinkelize(fn) {
  var slice = Array.prototype.slice,
      stored_args = slice.call(arguments, 1); 
  return function () {
    var new_args = slice.call(arguments), 
        args = stored_args.concat(new_args);
    return fn.apply(null, args); 
  };
}
// a normal function 
function add(x, y) {
  return x + y; 
}
// curry a function to get a new function 
var newadd = schonfinkelize(add, 5); 
newadd(4); // 9
// another option -- call the new function directly 
schonfinkelize(add, 6)(7); // 13

// Summary
// In JavaScript the knowledge and proper use of functions is critical. This chapter discussed the background and terminology related to functions. 
// You learned about the two important features of functions in JavaScript, namely:
// 1. Functions are first-class objects; they can be passed around as values and augmented with properties and methods.
// 2. Functions provide local scope, which other curly braces do not. Also something to keep in mind is that declarations of local variables get hoisted to the top of the local scope.
// The syntax for creating functions includes:
// 1. Named function expressions
// 2. Function expressions (the same as the above, but missing a name), also known as anonymous functions
// 3. Function declarations, similar to the function syntax in other languages
// After covering the background and syntax of functions, you learned about a number
// of useful patterns, which can be grouped into the following categories:
// 1. API patterns, which help you provide better and cleaner interfaces to your func- tions. These patterns include:
// Callback patterns
// Pass a function as an argument
// Configuration objects
// Help keep the number of arguments to a function under control
// Returning functions
// When the return value of one function is another function
// Currying
// When new functions are created based on existing ones plus a partial list of arguments
// 2. Initialization patterns, which help you perform initialization and setup tasks (very common when it comes to web pages and applications) in a clearer, structured way without polluting the global namespace with temporary variables. These include:
// Immediate functions
// Executed as soon as they are defined
// Immediate object initialization
// Initialization tasks structured in an anonymous object that provides a method to be called immediately
//   84 | Chapter 4: Functions
// Init-time branching
// Helps branch code only once during initial code execution, as opposed to many times later during the life of the application
// 3. Performance patterns, which help speed up the code. These include: Memoization
// Using function properties so that computed values are not computed again
// Self-defining functions
// Overwrite themselves with new bodies to do less work from the second invo- cation and after
