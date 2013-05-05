var pubsub  = require("new-pubsub"),
    publish = require('./lib/publish'),
    proxy   = require('./lib/proxy'),
    set     = require('./lib/set');

module.exports = List;

function List(){
  var array = Array.prototype.slice.call(arguments);

  self.array = array;
  self.updates = { add: undefined, remove: undefined };

  pubsub(self);

  bind ('concat')('join')('slice')('toSource')('toString')
       ('indexOf')('lastIndexOf')('forEach')('every')
       ('some')('filter')('map')('reduce')('reduceRight');

  self.len = function(){
    return self.array.length;
  };

  self.pop = function(){
    return proxy.pop(self);
  };

  self.push = function(){
    return proxy.push(self, arguments);
  };

  self.reverse = function(){
    return proxy.reverse(self);
  };

  self.shift = function(){
    return proxy.shift(self);
  };

  self.sort = function(compare){
    return proxy.sort(self, compare);
  };

  self.splice = function(){
    return proxy.splice(self, arguments);
  };

  self.unshift = function(){
    return proxy.unshift(self, arguments);
  };

  return self;

  function bind(m){
    self[m] = function(){
      return self.array[m].apply(self.array, arguments);
    };

    return bind;
  }

  function self(index, value){
    if(arguments.length > 1){
      set(self, index, value);
    }

    return array[index];
  };

}
