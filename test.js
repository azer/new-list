var List = require("./");

it('creates a new empty list', function(){
  var l = List();
  expect(l.len()).to.equal(0);
});


it('creates a new list with elements', function(){

  var l = List(3, 1, 4, 1, 5, 6);

  expect(l.len()).to.equal(6);

  expect(l(0)).to.equal(3);
  expect(l(3)).to.equal(1);
  expect(l(5)).to.equal(6);

});

it('pushes', function(done){

  var l = List(3);
  l.push(1, 4, 6);

  l.subscribe(function(update){
    expect(update.add).to.deep.equal({ 1: 1, 2: 4, 3: 6 });
    expect(update.add_len).to.equal(3);

    done();
  });

});

it('pops', function(done){

  var l = List(3, 1, 4);

  l.pop();

  l.subscribe(function(update){
    expect(update.remove).to.deep.equal([2]);
    done();
  });

});

it('reverses', function(done){

  var l = List(3, 1, 4);

  l.subscribe(function(update){
    expect(update.reverse).to.be.true;
    expect(l.slice()).to.deep.equal([4, 1, 3]);
    done();
  });

  l.reverse();

});

it('shifts', function(done){

  var l = List(3, 1, 4);

  expect(l.shift()).to.equal(3);

  l.subscribe(function(update){
    expect(update.remove).to.deep.equal([0]);
    done();
  });

});

it('sorts', function(done){

  var l = List(3, 1, 4);

  l.subscribe(function(update){
    expect(update.sort).to.be.true;
    done();
  });

  l.sort(function(a, b){
    return a > b ? 1 : ( b < a ? -1 : 0 );
  });

  expect(l.slice()).to.deep.equal([1, 3, 4]);

});

it('splices', function(done){

  var l = List(3, 1, 4, 1, 5, 6);

  l.splice(2, 2, 9, 8, 7);

  l.subscribe(function(update){
    expect(l.slice()).to.deep.equal([3, 1, 9, 8, 7, 5, 6]);
    expect(update.remove).to.deep.equal([2, 3]);
    expect(update.add).to.deep.equal({ 2: 9, 3: 8, 4: 7 });
    expect(update.add_len).to.equal(3);

    done();
  });

});

it('inserts new elements by splicing', function(done){
  var l = List();
  l.push(7, 11, 13);
  l.splice(0, 0, 17, 19);

  l.subscribe(function(update){
    expect(update.add).to.deep.equal({ 0: 17, 1: 19, 2: 7, 3: 11, 4: 13 });
    expect(update.add_len).to.equal(5);

    done();
  });

});

it('unshifts', function(done){

  var l = List(1, 5, 6);

  l.unshift(4);
  l.unshift(3, 1);

  l.subscribe(function(update){
    expect(update.add).to.deep.equal({ 0: 3, 1:1, 2: 4 });
    expect(update.add_len).to.equal(3);
    done();
  });

});

it('batches updates', function(done){

  var l = List();

  l.push(3, 7, 11, 13, 17);
  l.pop();
  l.shift();
  l.shift();
  l.push(19, 23, 27);

  expect(l.slice()).to.deep.equal([11, 13, 19, 23, 27]);

  l.subscribe(function(update){
    expect(update.add).to.deep.equal({ 0: 11, 1: 13, 2: 19, 3: 23, 4: 27 });
    expect(update.add_len).to.equal(5);

    done();
  });

});

it('batches more complicated updates', function(done){

  var l = List();

  l.push(3, 7, 11, 13, 17, 19, 23, 27);
  l.splice(2, 3, 'A');

  l.splice(0, 5, 'B', 'C');

  expect(l.slice()).to.deep.equal(['B', 'C', 27]);

  l.subscribe(function(update){
    expect(update.add).to.deep.equal({ 0: 'B', 1: 'C', 2: 27 });
    expect(update.add_len).to.equal(3);

    done();
  });

});

it('is the example in README', function(done){

  var todo = List('Buy milk', 'Take shower', 'Brush Teeths', 'Have coffee');

  todo.pop();
  todo.push('Cook Dinner');
  todo.splice(0, 1, 'Buy Milk And Bread');

  todo.subscribe(function(update){ // or todo.subscribe.once

    expect(update.add).to.deep.equal({ 0: 'Buy Milk And Bread', 3: 'Cook Dinner' });
    expect(update.remove).to.deep.equal([3, 0]);

    done();

  });

});
