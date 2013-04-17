## new-list

Same as native Array except it has a minimalistic
[pub/sub](http ://github.com/azer/new-pubsub) interface
that lets you subscribe to all changes on an array.

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
