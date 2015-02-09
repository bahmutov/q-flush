var Q = require('..');

gt.module('q-flush');

gt.test('methods added to Q', function () {
  gt.func(Q.deferFlush, 'has deferFlush');
  gt.func(Q.flush, 'has flush');
});

gt.test('sync promise test', function () {
  var result;

  Q.deferFlush();

  Q(10).then(function (value) {
    result = value;
    console.log('set result to', value);
  });

  console.log('flushing tasks');
  Q.flush();
  console.log('checking result');
  gt.equal(result, 10, 'result is not 10, but ' + result);
});

gt.test('several steps', function () {
  var a, b;

  Q.deferFlush();

  Q(10).then(function (value) {
    a = value;
    console.log('set result to', value);
    return 42;
  }).then(function (value) {
    b = value;
  }).done();

  Q.flush();
  gt.equal(a, 10, 'a is not 10, but ' + a);
  gt.equal(b, 42, 'b is not 10, but ' + b);
});
