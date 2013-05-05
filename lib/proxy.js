var publish = require("./publish"),
    add     = require("./add"),
    rm      = require('./rm');

var proto = Array.prototype;

module.exports = {
  pop     : pop,
  push    : push,
  reverse : reverse,
  shift   : shift,
  sort    : sort,
  splice  : splice,
  unshift : unshift
};

function pop(list){
  var ind = list.array.length - 1,
      ret = proto.pop.call(list.array);

  if(ind == -1) return ret;

  rm(list, ind);

  publish(list);

  return ret;
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
