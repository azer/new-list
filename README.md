## new-list

Creates native JavaScript arrays with [PubSub](http://github.com/azer/new-pubsub) interfaces that you can subscribe to
changes.

```js
List = require('new-list')
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

## Usage Example

```js
List = require('new-list')

fruits = List('cherry', 'melon', 'orange', 'kiwi')
// => ['cherry', 'melon', 'orange', 'kiwi']

fruits.subscribe(function(update){

    update.add
    // => { 0: 'apple', 1: 'banana', 3: 'strawberry' }

    update.remove
    // => [3]
    
    update.sort
    // => undefined
    // This returns true if reverse() or sort() methods are called.

})

fruits.pop()
fruits.push('strawberry')

fruits
// => ['cherry', 'melon', 'orange', 'strawberry']

fruits.splice(0, 0, 'apple', 'banana')
```

## Firing Custom Updates

```js
people = List({ name: 'Joe', age: 27 }, { name: 'Smith', age: 19 })

people.subscribe(function(update){
  
  if (update.person) {
    
    update.index
    // => 1
    
    update.person
    // => { name: 'Smith', age: 20 }
    
  }
  
})

people[1].age = 20
people.publish({ person: people[1], index: 1 })

```

![](https://dl.dropboxusercontent.com/s/gquje0z7y7oro4f/npmel_10.jpg)
