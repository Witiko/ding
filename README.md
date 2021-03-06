# Ding #

The ding library enables simple dispatchment of [storage events][].

  [Storage Events]: http://www.w3.org/TR/webstorage/#the-storage-event "Web Storage"

## API ##

### Method `ding.send` ###

Once called, the `ding.send` method will cause the dispatchment of a [storage event][storage events] in every other window / iframe sharing the dispatcher's domain and protocol. The method is invoked as follows:

    ding.send( name, value );

The method has no return value.

#### Attribute `name` ####

The `name` attribute may contain a reference to a string representing the name of the dispatched storage event. The name should be a fully qualified domain name to prevent collisions. If the `name` attribute is undefined, the default name `name.witiko.ding.names.default` is used instead.

#### Attribute `value` ####

The `value` attribute may contain a reference to a string representing the value dispatched with the event. If the `value` attribute is undefined, a pseudo-random hash obtained by executing `Math.random().toString(36).replace(/0\./, "")` is used instead.

#### Overloads ####

The `ding.send` method supports the following overloads:

  1. `ding.send([ name1, name2, ..., nameN ])` is equal to calling:

        ding.send( name1 );
        ding.send( name2 );
        ...
        ding.send( nameN );
  
  2. `ding.send({ name1: value1, name2: value2, ..., nameN: valueN })` is equal to calling:
  
        ding.send( name1, value1 );
        ding.send( name2, value2 );
        ...
        ding.send( nameN, valueN );

### Method `ding.listen` ###

Once called, the `ding.listen` method will add listeners for the specified names of incoming [storage events][] in the current window. The method is invoked as follows:

    ding.listen({
      "name1": callback1,
      "name2": callback2,
      ...
      "nameN": callbackN
    });

For every X from 1 through N, the `callbackX` method will be called, when a storage event with the `nameX` name is received. All names should be fully qualified domain names to prevent collisions. The method returns an unsubscription function, which will, once invoked, remove the listeners.

#### Overloads ####

The `ding.listen` method supports the following overloads:

  1. `ding.listen( callback )` is equal to calling `ding.listen({ "name.witiko.ding.names.default": callback });`

## Compatibility ##

Ding is compatible with any browser, which supports [ECMAScript 3+][ECMA-262 3rd edition] including the extensions described in the [WHATWG JavaScript specification][ECMAScript web extensions], the Web Storage interface as described in the [Web Storage W3C Recommendation][] and DOM 2 Events as described in the [DOM 2 Events W3C recommendation][DOM 2 Events]. The list includes:

 * Opera 10.50+
 * Mozilla/Firefox 3.5+
 * Internet Explorer 9+
 * Safari 4+
 * Chrome 4+

[ECMA-262 3rd edition]: http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf "ECMAScript Language Specification"
[ECMAScript web extensions]: http://javascript.spec.whatwg.org/ "JavaScript, aka. Web ECMAScript"
[Web Storage W3C Recommendation]: http://www.w3.org/TR/webstorage/ "Web Storage"
[DOM 2 Events]: http://www.w3.org/TR/DOM-Level-2-Events/ "DOM 2 Events Specification"
[DOM Storage guide]: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#Browser_compatibility "DOM Storage guide - Web developer guide | MDN"

## Compilation ##

### Assembly ###

The assembly of the ding source files requires a [POSIX.2][]-compliant environment. To begin the assembly, run the `make build` command in the uppermost folder of the project. At the end of the process, the `ding.js` file containing a static build of ding will be present in the `build` folder.

[POSIX.2]: http://pubs.opengroup.org/onlinepubs/009695399/ "The Open Group Base Specifications Issue 6"

### Minification ###

The minification of the ding source files requires the `closure-compiler` binary of the [Closure Compiler by Google][] to be executable and to reside within one of the directories in the `PATH` environment variable. To begin the minification, run the `make min` command in the uppermost folder of the project. At the end of the process, the `ding.min.js` file containing a static and minified build of ding will be present in the `build` folder.

The latest minified build of ding is also available online:

  * [`ding.min.js`](http://tiny.cc/dingjs)

Alternatively, you can use any other minification tool or service, as long as the license notice is kept intact.
  
  [Closure Compiler by Google]: https://developers.google.com/closure/compiler/ "Closure Tools -- Google Developers"

## Unit testing ##

By loading the `src/test.html` file in your browser, you can run a suite of tests against the `src/ding.js` and `src/framework.js` files. You can use this to check, whether:

  * Ding is compatible with a given browser.
  * Your modified version of jBus works as intended.

Since the test suite accesses frames and [`localStorage`][localStorage], both of which are known not to work under the `file://` pseudo-protocol in several browsers, you may want to try [the online version](https://dl.dropboxusercontent.com/u/48267088/Ding/test.html) instead.

[localStorage]: http://www.w3.org/TR/webstorage/#the-localstorage-attribute "Web Storage"

## License (MIT) ##

Copyright (c) 2014 Vít Novotný

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.