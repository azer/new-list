module.exports = rm;

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
