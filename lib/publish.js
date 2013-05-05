module.exports = publish;

function publish(list){
  if(list.publish.timer) return;

  list.publish.timer = setTimeout(function(){
    list.publish.timer = undefined;

    var msg = list.updates;
    list.updates = {};

    list.publish(msg);

  }, 0);
}
