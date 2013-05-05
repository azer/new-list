module.exports = add;

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
