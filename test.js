var test = require('tape');
var PassThrough = require('readable-stream/passthrough');
var pipeholder = require('./');
var piped = require('piped');

test('repipes sources and destination', function (t) {
  t.plan(2);

  var source = new PassThrough;
  var destination = new PassThrough;
  var holder = pipeholder();
  source.pipe(holder).pipe(destination);

  var r = piped(new PassThrough);
  r.on('pipe', function (src) {
    t.equal(src, source);
  });
  r.on('piped', function (dest) {
    t.equal(dest, destination);
  });

  holder.place(r);
});