## new-list ![Build Status](https://travis-ci.org/azer/new-list.png)

Array-like objects with [PubSub](http://github.com/azer/pubsub) interfaces that you can subscribe to
changes. See also: [new-object](https://github.com/azer/new-object)

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
todo(1, 'Take a long shower')
todo(1)
// => 'Take a long shower'
todo.len()
// => 2
todo()
// => ['Buy Milk and Bread', 'Take a long shower']

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

## Iteration

```js
fruits = List('Apple', 'Orange', 'Banana')

i = fruits.len()

while( i --> 0 ) {

  fruits(i)
  // => Apple (or Orange, Banana)

  fruits.array[i]
  // => Apple  (or Orange, Banana)

}
```

## API Reference

* **len()** Returns the length of the array. **Warning:* Never use *length* property.

### Mutator Methods

* **pop** Removes the last element from an array and returns that element.
* **push** Adds one or more elements to the end of an array and returns the new length of the array.
* **reverse** Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
* **shift** Removes the first element from an array and returns that element.
* **sort** Sorts the elements of an array.
* **splice** Adds and/or removes elements from an array.
* **unshift** Adds one or more elements to the front of an array and returns the new length of the array.

### Accessor Methods

* **concat** Returns a new array comprised of this array joined with other array(s) and/or value(s).
* **join** Joins all elements of an array into a string.
* **slice** Extracts a section of an array and returns a new array.
* **toSource** Returns an array literal representing the specified array; you can use this value to create a new array. Overrides the Object.prototype.toSource method.
* **toString** Returns a string representing the array and its elements. Overrides the Object.prototype.toString method.
* **indexOf** Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
* **lastIndexOf** Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.

### Iteration Methods

* **forEach** Calls a function for each element in the array.
* **every** Returns true if every element in this array satisfies the provided testing function.
* **some** Returns true if at least one element in this array satisfies the provided testing function.
* **filter** Creates a new array with all of the elements of this array for which the provided filtering function returns true.
* **map** Creates a new array with the results of calling a provided function on every element in this array.
* **reduce** Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.
* **reduceRight** Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.

![](https://dl.dropboxusercontent.com/s/gquje0z7y7oro4f/npmel_10.jpg)
