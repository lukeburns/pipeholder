var Duplex = require('readable-stream/duplex');
var piped = require('piped');

module.exports = pipeholder;

function pipeholder () {

  var sources = [];
  var destinations = [];

  duplex = piped(new Duplex);
  duplex._read = function () {}
  duplex._write = function () {}
  duplex.place = function (stream) {
    for (var i = 0; i < sources.length; i++) {
      sources[i].pipe(stream);
    }
    for (var i = 0; i < destinations.length; i++) {
      stream.pipe(destinations[i]);
    }
  }

  duplex.on('pipe', function (src) {
    sources.push(src);
    src.unpipe(this);
  });

  duplex.on('piped', function (dest) {
    destinations.push(dest);
    this.unpipe(dest);
  });

  return duplex;

}