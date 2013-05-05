var List = require('../');

it('syncs two arrays', function(){

  var a = List(),
      b = List();

  a.pipe(b);
  b.pipe(a);

  a.push('hello', 3.14);
  b.push('foobar');

  a.subscribe(function(update){
    expect(update.add).to.deep.equal({ 0: 'hello', 1: 3.14, 2: 'foobar' });
  });

});
