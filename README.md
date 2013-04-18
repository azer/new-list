## new-list

Array-like objects with [PubSub](http://github.com/azer/new-pubsub) interfaces that you can subscribe to
changes.

```js
List = require('new-list')
todo = List('Buy milk', 'Take shower')

todo.pop()
todo.push('Cook Dinner')
todo.splice(0, 1, 'Buy Milk And Bread')

todo(0)
// => 'Buy Milk and Break'
todo(1)
// => 'Take shower'

todo.subscribe(function(update){ // or todo.subscribe.once

  update.add
  // => { 0: 'Buy Milk And Bread', 1: 'Cook Dinner' }
  
  update.remove
  // => [0, 1]
  
  update.sort
  // => undefined

})
```

## Install

```bash
$ npm install new-list
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
