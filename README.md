# q-flush

> Defer and flush Q promise chains on demand, allows sync unit tests

[![NPM][q-flush-icon] ][q-flush-url]

[![Build status][q-flush-ci-image] ][q-flush-ci-url]
[![dependencies][q-flush-dependencies-image] ][q-flush-dependencies-url]
[![devdependencies][q-flush-devdependencies-image] ][q-flush-devdependencies-url]

[q-flush-icon]: https://nodei.co/npm/q-flush.png?downloads=true
[q-flush-url]: https://npmjs.org/package/q-flush
[q-flush-ci-image]: https://travis-ci.org/bahmutov/q-flush.png?branch=master
[q-flush-ci-url]: https://travis-ci.org/bahmutov/q-flush
[q-flush-dependencies-image]: https://david-dm.org/bahmutov/q-flush.png
[q-flush-dependencies-url]: https://david-dm.org/bahmutov/q-flush
[q-flush-devdependencies-image]: https://david-dm.org/bahmutov/q-flush/dev-status.png
[q-flush-devdependencies-url]: https://david-dm.org/bahmutov/q-flush#info=devDependencies

Usually we cannot write sync unit tests if there are promises. For example, this code fails,
because the `console.log` line executes *before* the `.then` callback executes.

```js
var result;
Q(10).then(function (value) {
  result = value;
});
console.log(result); // prints undefined
```

Using `q-flush` you can collect all `.then` calls, and then execute them *synchronously*.

```js
var Q = require('Q');
require('q-flush');

var result;
Q.deferFlush();
Q(10).then(function (value) {
  result = value;
});
Q.flush();
console.log(result); // prints 10
```

While this is possible, I still argue that a better option would be to pick a testing framework
that understands the promises natively, for example [Mocha](http://mochajs.org/). 
See [Picking JavaScript testing framework](http://bahmutov.calepin.co/picking-javascript-testing-framework.html).

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/q-flush/issues) on Github



## MIT License

The MIT License (MIT)

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
