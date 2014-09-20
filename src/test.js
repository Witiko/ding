// A test suite for ding
var tests = {
  "Unit tests": {
    "ding.send (w/ value)": function(success, failure) {
      /**
       * We create a new listener in the target iframe,
       * we send a ding and we wait for it to be received intact.
       */
      var name = getRandomName(),
          value = $String.random(),
          listeners = {};
      listeners[name] = function(receivedValue) {
        if( receivedValue === value ) {
          success();
        } else {
          failure();
        } unsubscribe();
      }; var unsubscribe = target.listen( listeners );
      ding.send( name, value );
    }, "ding.send (w/o value)": function(success, failure) {
      /**
       * We create a new listener in the target iframe,
       * we send a ding and we wait for it to be received intact.
       */
      var name = getRandomName(), listeners = {};
      listeners[name] = function() {
        success();
        unsubscribe();
      }; var unsubscribe = target.listen( listeners );
      ding.send( name );
    }, "ding.send (overload #1)": function(success, failure) {
      /**
       * We create several listeners in the target iframe,
       * we send dings to the respective listeners and we
       * wait for them to be received intact.
       */
      var amount = [ 1, 2, 3 ],
          names = $Array.map( amount, getRandomName ),
          values = $Array.map( amount, $String.random ),
          listeners = {}, object = {}, count = 0;
      $Array.forEach(names, function(name, index) {
        var value = values[index];
        object[name] = value;
        listeners[name] = function(receivedValue) {
          if( receivedValue !== value ) {
            failure();
            unsubscribe();
          } else if( ++count === amount.length ) {
            success();
            unsubscribe();
          }
        };
      }); var unsubscribe = target.listen( listeners );
      ding.send( object );
    }, "ding.send (overload #2)": function(success, failure) {
      /**
       * We create several listeners in the target iframe,
       * we send dings to the respective listeners and we
       * wait for them to be received intact.
       */
      var amount = [ 1, 2, 3 ],
          names = $Array.map( amount, getRandomName ),
          listeners = {}, count = 0;
      $Array.forEach(names, function(name, index) {
        listeners[name] = function(receivedValue) {
          if( ++count === amount.length ) {
            success();
            unsubscribe();
          }
        };
      }); var unsubscribe = target.listen( listeners );
      ding.send( names );
    }, "ding.listen": new RelativePath( "ding.send (w/ value)" ),
    "ding.listen (listener unsubscription)": function(success, failure) {
      /**
       * We create a new listener in the target iframe,
       * we unsubscribe it, send a ding and we check
       * that it has not been received bz the listener.
       */
      var name = getRandomName(),
          listeners = {};
      success();
      listeners[name] = failure;
      target.listen( listeners )();
      ding.send( name );
    }, "Function ding~isString": function(success, failure) {
      /* We check, whether the predicate holds. */
      if( isString(   "<string>"   ) === true  &&
          isString(   /<RegExp>/   ) === false &&
          isString(     12345      ) === false &&
          isString(      true      ) === false &&
          isString( function() { } ) === false &&
          isString( {/* Object */} ) === false &&
          isString( [/* Array  */] ) === false ) {
        success();
      } else {
        failure();
      }
    }, "Function ding~isArray": function(success, failure) {
      /* We check, whether the predicate holds. */
      if( isArray(   "<string>"   ) === false &&
          isArray(   /<RegExp>/   ) === false &&
          isArray(     12345      ) === false &&
          isArray(      true      ) === false &&
          isArray( function() { } ) === false &&
          isArray( {/* Object */} ) === false &&
          isArray( [/* Array  */] ) === true  ) {
        success();
      } else {
        failure();
      }
    }, "Function ding~isFunction": function(success, failure) {
      /* We check, whether the predicate holds. */
      if( isFunction(   "<string>"   ) === false &&
          isFunction(   /<RegExp>/   ) === false &&
          isFunction(     12345      ) === false &&
          isFunction(      true      ) === false &&
          isFunction( function() { } ) === true  &&
          isFunction( {/* Object */} ) === false &&
          isFunction( [/* Array  */] ) === false ) {
        success();
      } else {
        failure();
      }
    }, "Function ding~new$Array (array copy)": function(success, failure) {
      /* We make a copy of an array and check that it is identical */
      var array = [ "1", 2, ,[], 3 ],
          copy = new$Array(array);
      if( array[0] == copy[0] &&
          array[1] == copy[1] &&
          array[2] == copy[2] &&
          array[3] == copy[3] &&
          array[4] == copy[4] ) {
        success();
      } else {
        failure();
      }
    }, "Function ding~new$Array (converting iterable into array)": function(success, failure) {
      /* We make a copy of an array and check that it is identical */
      var array = [ "1", 2, ,[], 3 ],
          copy = new$Array({
            0: array[0],
            1: array[1],
            2: array[2],
            3: array[3],
            4: array[4],
            length: array.length
          });
      if( array[0] == copy[0] &&
          array[1] == copy[1] &&
          array[2] == copy[2] &&
          array[3] == copy[3] &&
          array[4] == copy[4] ) {
        success();
      } else {
        failure();
      }
    }, "Method ding~$String.random": function(success, failure) {
      /* We check, whether the predicate holds. */
      if( isString( $String.random() ) ) {
        success();
      } else {
        failure();
      }
    }, "Method ding~$Array.forEach": function(success, failure) {
      /* We compute a sum of the values in an array * 2 + the amount of
         defined items in the sparse array and check if the result is correct. */
      var sum = 0;
      $Array.forEach( [ 1,, 2, 3, 4,, 5 ], function( value, index, array ) {
        sum += value + array[index] + 1;
      }); if(sum === 35) {
        success();
      } else {
        failure();
      }
    }
  }
};

/**
 * Returns a random name.
 * @return a random name.
 */
function getRandomName() {
  return "name.witiko.ding.testsuite.name@" + $String.random();
}