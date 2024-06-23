# Rendering Lists

"You will often want to display multiple similar components from a collection of data. You can use the Javascript array methods to manipulate an array of data."

(**filter() and map() with React to filter and transform your array of data into an array of components.**)

> You will learn:
>
> - How to render components from an array using Javascript's map()
> - How to render only specific components using Javascript's filter()
> - When and why to use Rreact keys

### Rendering data from arrays

> Say you have a list of content.
>
> The only difference among those list items is their contents, their data.
>
> You will often need to show several instances of the same component using different data when building interfaces: from lists of components to galleries of profile images.

In these situations, you can store that data in Javascript objects and arrays use methods like map() and filter() to render lists of components from them.

How to generate a list of items:

1. Move the data into an array.
2. Map the people members into a new array of JSX node, listItems.
3. Return listItems from your component wrapped in a <ul>.

### Filtering arrays of items

> The data can be structured even more.

    const people = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    }]

> Let's say you want to only show people whose profession is "chemist".
>
> You can use Javascript's filter() method to return just those people. This method takes an array of items, passes them through a "test" (a function that returns true or false), and returns a new array of only those items that passes the test (returned true).

1.  Create a new array of just "chemist" people, by calling filter() on the people filtering by person.profession === 'chemist'

        const chemists = people.filter(person =>
            person.profession === 'chemist'
        );

2.  Now map over the chemist and prepare JSX.
3.  Lastly, return the listItems from your component.

**Pitfall:**

- Arrow functions implicitly return the expression right after =>, so you didn't need a return statement.

        const listItems = chemists.map(person =>
            <li>...</li> // Implicit return!
        );

- However, **you must write return explicitly if your => is followed by a { curly braces!**

          const listItems = chemists.map(person => { //Curly brace
              return <li>...</li>;
          });

- Arrow functions containing => { are said to have a "block body". They let you write more than a single line of code, but you have to write a return statement yourself. If you forget it, nothing gets returned.

### Keeping list items in order with _key_

Notice that all the sandboxes above show an error in console:

    Warning: Each child in a list should have a unique “key” prop.

You need to give each array item a key - a string or a number that uniquely identifies it among other items in that array:

    <li key={person.id}>...</li>

**_Note_**: JSX elements directly inside a map() always need keys!

Keys tell React **which array item each component corresponds to, so that it can match them up later.**

> This becomes important if your array items can move (eg: due to sorting), get inserted, or get deleted.

A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree.

> Rathering than generating key on the fly, you should include them in your data.

##### Displaying several DOM nodes for each list item

What do you do when each item needs to render not one, but several DOM nodes?

> The short <>...</> Fragment syntax won't let you pass a key, so you need to either group them into a single <div>, or use the slightly longer and more explicit <Fragment> syntax:

    > import {Fragment} from "react";
    > // ...
    > const listItems = people.map(person =>
    >   <Fragment key=>{person.id}>
    >       <h1>{person.name}</h1>
    >       <p>{person.bio}</p>
    >   </Fragent>);

Note: Fragments disappear from DOM, so this will produce a flat list of <h1>, <p>, <h1>, <p>, and so on.

### Where to get your _key_

Different sources of data provide different sources of keys:

- Data from a database:
  If your data is coming from a database, you can use the database keys/IDs, which are unique by nature,
- Locally generated data:
  If your data is generated and persisted locally (e.g. notes in a note-taking app), use an incrementing counter, crypto, randomUUID() or a package like uuid when creating items.

### Rules of _keys_

- **Keys must be unique among siblings.**
  However, it's okay to use the same keys for JSX nodes in different arrays.
- **Keys must not change** or that defeats their purpose! Don't generate them while rendering.

---

## Why does React need keys?

> Imagine that files on your desktop didn't have names. Instead, you'd refer to them by their order - the first file, the second file, and so on.
>
> You could get used to it, but once you delete a file, it would get confusing.
>
> The second file would become the first file, the third file would be second file, and so on...

**File names in a folder and JSX keys in an array serve a similar purpose.**

> They let us uniquely identify an item between its siblings. A well-chosen key provides more information than the position within the array.
>
> Even if the position changes due to reordering, the key lets React identify the item throughout its lifetime.

**Pitfall**

> You might be tempted to use an item’s index in the array as its key.
>
> In fact, that’s what React will use if you don’t specify a key at all.
>
> But the order in which you render items will change over time if an item is inserted, deleted, or if the array gets reordered.

**Index as a key often leads to subtle and confusing bugs.**

**Similarly, do not generate keys on the fly, e.g. with key={Math.random()}.**

> This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time.
>
> Not only is this slow, but it will also lose any user input inside the list items.

**Instead, use a stable ID based on the data.**

**Note**: your components won’t receive key as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: <Profile key={id} userId={id} />.
