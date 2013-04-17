## new-list

Same as the native Array except lists have a minimalistic
[pub/sub](http ://github.com/azer/new-pubsub) interface
that lets you subscribe to all changes on arrays.

```js
todo = List('Buy milk', 'Take shower')

todo.pop()
todo.push('Cook Dinner')
todo.splice(0, 1, 'Buy Milk And Bread')

todo.subscribe(function(update){ // or todo.subscribe.once

  update.add
  // => { 0: 'Buy Milk And Bread', 1: 'Cook Dinner' }
  
  update.remove
  // => [0, 1]

})
```

## Install

```bash
$ npm install new-list
```

## Usage

```js
list = require('new-list')

fruits = List('cherry', 'melon', 'orange', 'kiwi')
// => ['cherry', 'melon', 'orange', 'kiwi']

fruits.subscribe(function(update){

    update.add
    // => { 0: 'apple', 1: 'banana', 3: 'strawberry' }

    update.remove
    // => [3]

})

fruits.pop()
fruits.push('strawberry')

fruits
// => ['cherry', 'melon', 'orange', 'strawberry']

fruits.splice(0, 0, 'apple', 'banana')
```

![](https://dl.dropboxusercontent.com/s/gquje0z7y7oro4f/npmel_10.jpg)
