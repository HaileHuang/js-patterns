var myevent = { // ...
  stop: function (e) { // others
    if (typeof e.preventDefault === "function") {
      e.preventDefault(); 
    }
    if (typeof e.stopPropagation === "function") {
      e.stopPropagation(); 
    }
    // IE
    if (typeof e.returnValue === "boolean") {
      e.returnValue = false; 
    }
    if (typeof e.cancelBubble === "boolean") {
      e.cancelBubble = true; 
    }
  }
// ... 
};

// Sometimes two or more methods may commonly be called together. 
// In such cases it makes sense to create another method that wraps the repeating method calls.

// The façade pattern is also helpful with redesign and refactoring efforts.
// When you want to replace an object with a different implementation.
// You can start with thinking about the new object’s API and then proceed to
// create a façade in front of the old object that follows the new API.
// This way, when you get to fully replacing the old object,
// you’ll have less client code to modify because any recent client code will already use the new API.