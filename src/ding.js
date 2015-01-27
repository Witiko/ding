var ding = (function() {

  // # Constants #
  var PREFIX = "name.witiko.ding::",
      LOGGER = "[ding]", WARNING = "Warning:",
      DEFAULT = "name.witiko.ding.names.default";
  
  // # Utility function #
  
  // @include framework

  /** Logs the arguments to the console. */
  var log = window.console && isFunction( window.console.log ) ? function() {
    window.console.log.apply(
      window.console, [ LOGGER ].concat( new$Array( arguments ) ));
  } : function() { };

  // # The ding object #
  var ding = {
    send:
      // @annotate Method `ding.send`
      function(name, value) {
        if( arguments.length === 0 ) {
          ding.send( DEFAULT );
        } else if( isArray(name) ) {
          $Array.forEach( name, ding.send );
        } else if( isString(name) ) {
          if(!isQualified( name )) {
            warn( "An event", name, "without a fully qualified domain " + 
              "name has been dispatched." );
          } var key = prefix.add( name );
          localStorage.setItem( key, isString( value ) ? value : $String.random() );
          localStorage.removeItem( key );
        } else if(typeof name === "object") {
          for(var i in name) {
            ding.send( i, name[i] );
          }
        } else {
          console.log( arguments.length );
          throw new TypeError( "Unexpected arguments have been passed to "
            + "the ding.send method: [ " + new$Array( arguments ).join(", ") + " ]" );
        }
      },
    
    listen:
      // @annotate Method `ding.listen`
      function(listeners) {
        if( isFunction(listeners) ) {
          var obj = {};
          obj[ DEFAULT ] = listeners;
          return ding.listen( obj );
        }
      
        addEventListener( "storage", callback, false );
        for( var key in listeners ) {
          if(!isQualified( key )) {
            warn( "A listener for an event", key, "without a fully " +
              "qualified domain name has been added." );
          }
        } return function() {
          removeEventListener( "storage", callback );
        };
        
        function callback(evt) {
          if(!evt.newValue || !prefix.has(evt.key)) return;
          var key = prefix.remove( evt.key );
          if( key in listeners ) {
            async(function() {
              listeners[key]( evt.newValue );
            });
          }
        }
      }
    }, prefix = {
      add:
        /**
         * Prefixes the given name with the ding prefix.
         * @param name - The given name.
         * @return the prefixed name.
         */
        function(name) {
          return PREFIX + name;
        },

      has:
        /**
         * Tests whether the given name starts with the ding prefix.
         * @param name - The given name.
         * @return whether the given name starts with the ding prefix.
         */
        function(name) {
          return name.indexOf(PREFIX) == 0;
        },
      
      remove:
        /**
         * Removes the ding prefix from the given name.
         * @param name - The given name.
         * @return the name without the ding prefix.
         */
        function(name) {
          return name.substr( PREFIX.length );
        }
    };
  
  // # Utility function #
  
  /**
   * Asynchronously fires the given function.
   * @param func - The given function.
   */
  function async(func) {
    setTimeout( func, 1 );
  }
  
  /**
   * Returns whether the given name is a fully qualified domain name.
   * @param name - The given name.
   * @return whether the given name is a fully qualified domain name.
   */
  function isQualified(name) {
    return  /\./.test( name );
  }
  
  /** Logs the arguments to the console as a warning. */
  function warn() {
    log.apply(null, [ WARNING ].concat( new$Array( arguments ) ))
  }
  
  return ding;

})();
