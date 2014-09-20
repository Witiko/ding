/**
 * Returns the index at which the given array contains the
 * given value. If the array doesn't contain the given value,
 * -1 is returned instead.
 *
 * @param arr - The given array.
 * @param val - The given value.
 * @return the index at which the given array contains the
 *         given value.
 */
$Array.indexOf = "indexOf" in Array.prototype
  ? function(arr, val) {
      return arr.indexOf( val );
    }
  : function(arr, val) {
    for(var i = 0; i < arr.length; i++) {
      if( arr[i] === val ) {
        return i;
      }
    } return -1;
  };
  
/**
 * Returns whether the given array contains the given value.
 *
 * @param arr - The given array.
 * @param val - The given value.
 * @return whether the given array contains the given value.
 */
$Array.contains = function(arr, val) {
  return $Array.indexOf( arr, val ) !== -1;
};

/**
 * Iterates over the given array calling the given
 * callback function at each defined cell with the
 * following parameters:
 *
 *   value, index, array
 *
 * The return value of the callback function is
 * stored in the output array.
 *
 * @param arr - The given array.
 * @param callback - The given callback function.
 * @return the output array.
 */
$Array.map = "map" in Array.prototype
  ? function(arr, callback) {
      return arr.map( callback );
    }
  : function(arr, callback) {
    var mapped = [ ];
    for(var i = 0; i < arr.length; i++) {
      if( i in arr ) {
        mapped.push( callback( arr[i], i, arr ) );
      }
    } return mapped;
  };