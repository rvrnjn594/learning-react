## Describing the UI

React is Javascript library for rendering user interfaces.

User Interfaces built from small units like buttons, text and images. React lets you combine them into reusable, nestable components.

### Topics:

#### Your first component

> React applications are built from isolated pieces of UI called components.
>
> A React component is a JavaScript function that you can sprinkle with markup.

#### Importing and exporting components

> You can export a component into its own file, and then import that component from another file.

#### Writing markup with JSX

> Each React component is JavaScript function that may contain some markup that React renders into the browser.
>
> React components use a syntax extension called JSX to represent that markup.
>
> JSX looks alot like HTML, but it is a bit stricter and can display dynamic information.

**Note:** If you have existing HTML, you can fix it using a converter.

#### JavaScript in JSX with curly braces

> JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place.
>
> Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup.

In this situation, you can **use curly braces in your JSX to "open a window" to JavaScript**.

#### Passing props to a component

> React components use props to communicate with each other.
>
> Every parent component can pass some information to its child component by giving them props.
>
> Props might remind you of html attributes, but you can pass any JavaScript value through them, including objects, arrays, functions, and even JSX.

#### Conditional Rendering

> In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.

#### Rendering lists

> To display multiple similar components from a collection of data, use JavaScript's filter() and map() with React to filter and transform your array of data into an array of components.

#### Keeping components pure

> Some JavaScript functions are pure. A pure function:
>
> - Minds its own business. It does not change any objects or variables that existed before it was called.
> - Same inputs, same output. Given the same inputs, a pure function should always return the same result.

By strictly writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows.

#### Your UI as a tree

**React uses trees to model the relationships between components and modules.**

**_A React render tree is a representative of the parent and child relationship between components._**

- Components near the top of the tree, near the root component, are considered top-level components.
- Components with no child components are leaf components.

This characterization of components is useful for understanding data flow and rendering performance.

> Modelling the relationship between JavaScript modules is another useful way to understand your app.

**This is referred as module-dependency-tree.**

> A dependency tree is often used by build tools to bundle all the relevant JavaScript code for the client to download and render.
>
> > A large bundle size regresses user experience for React apps. Understanding the module dependency tree is helpful to debug such issues.
