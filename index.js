var PassThrough = require('stream').PassThrough;
var piped = require('piped');

module.exports = pipeholder;

function pipeholder (stream) {

  stream = piped(stream || new PassThrough);

  stream.sources = []
  stream.destinations = []

  stream.place = function (ns) {
    if (ns.writable) {
      for (var i = 0; i < stream.sources.length; i++) {
        stream.sources[i].pipe(ns);
      }
    }
    if (ns.readable) {
      for (var i = 0; i < stream.destinations.length; i++) {
        ns.pipe(stream.destinations[i]);
      }
    }
  }

  stream.on('pipe', function (src) {
    src.unpipe(this);
    stream.sources.push(src);
  });

  stream.on('piped', function (dest) {
    this.unpipe(dest);
    stream.destinations.push(dest);
  });

  return stream;

}