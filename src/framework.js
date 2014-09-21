/**
 * Returns whether or not a value is a string.
 * @param str - The tested value.
 * @return whether or not a value is a string.
 */
function isString(str) {
  return typeof str === "string" ||
                str instanceof String;
}

/**
 * Returns whether or not a value is a function.
 * @param func - The tested value.
 * @return whether or not a value is a function.
 */
function isFunction(func) {
  return func instanceof Function ||
         typeof func === "function";
  /* This ^ makes the test work as
     expected for functions received
     from other window objects -- the
     function is then an instance of
     otherWindow.Function rather than
     Function. */
}

/**
 * Returns whether or not a value is an array.
 * @param arr - The tested value.
 * @return whether or not a value is an array.
 */
var isArray = Array.isArray || function(arr) {
  return arr instanceof Array;
};

// String-specific functions
var $String = {

  /**
   * Returns a random hash containing [0-9a-z] characters.
   * @return a random hash containing [0-9a-z] characters.
   */
  random: function() {
    return Math.random().toString(36).replace(/0\./, "");
  }
  
};

/**
 * Returns an array copy of the given iterable.
 * @param iter - The given iterable.
 * @return an array copy of the given iterable.
 */
var new$Array = Array.from || function(iter) {
  return Array.prototype.slice.call( iter, 0 );
}

// Array-specific ECMAv5-inspired functions
var $Array = {

  /**
   * Iterates over the given array calling the given
   * callback function at each defined cell with the
   * following parameters:
   *
   *   value, index, array
   *
   * @param arr - The given array.
   * @param callback - The given callback function.
   */
  forEach: "forEach" in Array.prototype
    ? function(arr, callback) {
        arr.forEach( callback );
      }
    : function(arr, callback) {
      for(var i = 0; i < arr.length; i++) {
        if( i in arr ) {
          callback( arr[i], i, arr );
        }
      }
    }
  
};