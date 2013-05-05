var publish = require("./publish");

module.exports = set;

function set(list, index, value){
  if( ! list.updates.set ) {
    list.updates.set = {};
    list.updates.set_len = 0;
  }

  list.array[index] = value;
  publish(list);
}
