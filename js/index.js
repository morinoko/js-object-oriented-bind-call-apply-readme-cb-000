// use this to copy code snippets or us your browser's console

function greet() {
    console.log(`my name is ${this.name}, hi!`);
}

greet(); // my name is , hi! this refers to window so there is no name.

let person = {
    name: 'Bob',
    greet: greet
};

person.greet(); // my name is Bob, hi! This refers to the object with a name property

function greet(customerOne, customerTwo) {
    console.log(`Hi ${customerOne} and ${customerTwo}, my name is ${this.name}!`);
}

let sally = {
  name: 'Sally'
};

// With call, pass the object for `this` as the first argument, followed by any
// function arguments in order
greet.call(sally, 'Terry', 'George');

greet.call(sally);
// => Hi undefined and undefined, my name is Sally!
// Undefined values because they were not passed into the function

// With apply, it takes only two arguments: the first is the object for `this`
// and the second is an array of the arguments to pass into the function.
greet.apply(sally, ['Terry', 'George']);


// Bind to bind context to a function
let sally = { name: 'Sally' };

function greet(customer) {
    console.log(`Hi ${customer}, my name is ${this.name}!`);
}

let newGreet = greet.bind(sally); // newGreet is context-bound to sally

newGreet('Bob');

greet('Bob');
// -----------------------------------


class Event {
  constructor(title, keywords) {
    this.title = title;
    this.keywords = keywords;
  }
}

class User {
  constructor(name, interests) {
    this.name = name;
    this.interests = interests;
  }

  matchInterests(event) {
    return event.keywords.some(function(word) {
      return this.interests.includes(word);
    });
  }
}

let billy = new User('billy', ['music', 'art', 'movies']);
let freeMusic = new Event('Free Music Show', ['music', 'free', 'outside']);

billy.matchInterests(freeMusic);

// with code above, causes an error because `this` inside the `some` callback
// function is reset to that function's context, thus `this` is undefined.

// To solve the problem, use `bind`

class Event {
  constructor(title, keywords) {
    this.title = title;
    this.keywords = keywords;
  }
}

class User {
  constructor(name, interests) {
    this.name = name;
    this.interests = interests;
  }

  matchInterests(event) {
    return event.keywords.some(
      function(word) {
        return this.interests.includes(word);
      }.bind(this) // added to end of the callback);
    );
  }

  // Can be rewritten with an arrow function, as well, which will refer to the context
  // that the arrow function was invoked in
  matchInterests(event) {
    return event.keywords.some(word => this.interests.includes(word));
  }
}

let billy = new User('billy', ['music', 'art', 'movies']);
let freeMusic = new Event('Free Music Show', ['music', 'free', 'outside']);

billy.matchInterests(freeMusic);
