var pubsub = require("new-pubsub"),
    proto  = Array.prototype;

module.exports = List;

function List(){
  var array = proto.slice.call(arguments);

  self.array = array;
  self.updates = { add: undefined, remove: undefined };

  pubsub(self);
  bind('concat', 'join', 'slice', 'toSource', 'toString',
       'indexOf', 'lastIndexOf', 'forEach', 'every',
       'some', 'filter', 'map', 'reduce', 'reduceRight');

  self.len = function(){
    return self.array.length;
  };

  self.pop = function(){
    return pop(self);
  };

  self.push = function(){
    return push(self, arguments);
  };

  self.reverse = function(){
    return reverse(self);
  };

  self.shift = function(){
    return shift(self);
  };

  self.sort = function(compare){
    return sort(self, compare);
  };

  self.splice = function(){
    return splice(self, arguments);
  };

  self.unshift = function(){
    return unshift(self, arguments);
  };

  return self;

  function bind(){
    var i = arguments.length, m;

    while( i -- ){
      m = arguments[i];
      self[m] = function(){
        return self.array[m].apply(self.array, arguments);
      };
    }
  }

  function self(index){
    return array[index];
  };

}

function add(list, index, value){
  if( ! list.updates.add ) {
    list.updates.add = {};
    list.updates.add_len = 0;
  }

  var i = list.updates.add_len;

  while ( i -- ){
    if ( i < index ) break;
    list.updates.add[ i + 1 ] = list.updates.add[i];
    delete list.updates.add[i];
  }

  list.updates.add[index] = value;
  list.updates.add_len++;
}

function pop(list){
  var ind = list.array.length - 1,
      ret = proto.pop.call(list.array);

  if(ind == -1) return ret;

  rm(list, ind);

  publish(list);

  return ret;
}

function publish(list){
  if(list.publish.timer) return;

  list.publish.timer = setTimeout(function(){
    list.publish.timer = undefined;

    var msg = list.updates;
    list.updates = {};

    list.publish(msg);

  }, 0);
}

function push(list, elements){
  var relIndex = list.array.length,
      ret      = proto.push.apply(list.array, elements);

  var i = -1;
  while( ++i < elements.length ) {
    add( list,  relIndex + i, elements[ i ] );
  }

  elements.length && publish(list);

  return ret;
}

function reverse(list){
  var ret = proto.reverse.call(list.array);
  list.publish({ reverse: true, sort: true });
  return ret;
}

function rm(list, index, updateIndex){
  if( ! list.updates.remove ) list.updates.remove = [];

  var i, len = list.updates.add ? list.updates.add_len : 0;

  if (list.updates.add) {
    delete list.updates.add[index];
    list.updates.add_len--;

    i = index;
    while( ++i < len ) {
      list.updates.add[ i - 1 ] = list.updates.add[i];
      delete list.updates.add[i];
    }
  }

  list.updates.remove.push(arguments.length > 2 ? updateIndex : index);
}

function shift(list){
  var ret = proto.shift.call(list.array);

  rm(list, 0);

  publish(list);

  return ret;
}

function sort(list, compare){
  var ret = proto.sort.call(list.array, compare);
  list.publish({ sort: true });
  return ret;
}

function splice(list, params){
  var len = list.array.length,
      ret = proto.splice.apply(list.array, params);

  if(arguments.length == 0) return ret;

  var start = params[0],
      end   = start + params[1],
      i     = start - 1;

  while( ++i < end && i > -2 ) {
    rm(list, start, i);
  }

  i = 1;
  while( ++i < params.length ){
    add(list, start + i - 2, params[i]);
  }

  publish(list);

  return ret;
}

function unshift(list, params){
  var ret = proto.unshift.apply(list.array, params);

  var i   = -1,
      len = params.length;

  while( ++i < len ) {
    add(list, i, params[i]);
  }

  params.length && publish(list);

  return ret;
}
