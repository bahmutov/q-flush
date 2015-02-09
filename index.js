var Q = require('q');

var _process = process.nextTick.bind(process);

var _queue = [];

if (!Q.deferFlush) {
  Q.deferFlush = function deferFlush() {
    process.nextTick = function (cb) {
      _queue.push(cb);
    };
  };
}

if (!Q.flush) {
  Q.flush = function flush() {
    console.log('flushing task queue');
    var head;
    while (head = _queue.shift()) {
      head();
    }
    process.nextTick = _process;
  };
}

module.exports = Q;
