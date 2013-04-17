var pubsub = require("new-pubsub"),
    proto  = Array.prototype;

module.exports = List;

function List(){
  var list;

  list         = pubsub(proto.slice.call(arguments));
  list.updates = { add: undefined, remove: undefined };

  list.pop = function(){
    return pop(list);
  };

  list.push = function(){
    return push(list, arguments);
  };

  list.reverse = function(){
    return reverse(list);
  };

  list.shift = function(){
    return shift(list);
  };

  list.sort = function(compare){
    return sort(list, compare);
  };

  list.splice = function(){
    return splice(list, arguments);
  };

  list.unshift = function(){
    return unshift(list, arguments);
  };

  return list;
}

function add(list, index, value){
  if( ! list.updates.add ) {
    list.updates.add = {};
    list.updates.add_length = 0;
  }

  var i = list.updates.add_length;

  while ( i -- ){
    if ( i < index ) break;
    list.updates.add[ i + 1 ] = list.updates.add[i];
    delete list.updates.add[i];
  }

  list.updates.add[index] = value;
  list.updates.add_length++;
}

function pop(list){
  var ind = list.length - 1,
      ret = proto.pop.call(list);

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
  var relIndex = list.length,
      ret      = proto.push.apply(list, elements);

  var i = -1;
  while( ++i < elements.length ) {
    add( list,  relIndex + i, elements[ i ] );
  }

  elements.length && publish(list);

  return ret;
}

function reverse(list){
  var ret = proto.reverse.call(list);
  list.publish({ reverse: true, sort: true });
  return ret;
}

function rm(list, index, updateIndex){
  if( ! list.updates.remove ) list.updates.remove = [];

  var i, len = list.updates.add ? list.updates.add_length : 0;

  if (list.updates.add) {
    delete list.updates.add[index];
    list.updates.add_length--;

    i = index;
    while( ++i < len ) {
      list.updates.add[ i - 1 ] = list.updates.add[i];
      delete list.updates.add[i];
    }
  }

  list.updates.remove.push(arguments.length > 2 ? updateIndex : index);
}

function shift(list){
  var ret = proto.shift.call(list);

  rm(list, 0);

  publish(list);

  return ret;
}

function sort(list, compare){
  var ret = proto.sort.call(list, compare);
  list.publish({ sort: true });
  return ret;
}

function splice(list, params){
  var len = list.length,
      ret = proto.splice.apply(list, params);

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
  var ret = proto.unshift.apply(list, params);

  var i   = -1,
      len = params.length;

  while( ++i < len ) {
    add(list, i, params[i]);
  }

  params.length && publish(list);

  return ret;
}
