# State: A Component's Memory

Components often need to change what’s on the screen as a result of an interaction.

> Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart.
>
> Components need to “remember” things: the current input value, the current image, the shopping cart.

In React, this kind of component-specific memory is called state.

> You will learn
>
> - How to add a state variable with the useState Hook
> - What pair of values the useState Hook returns
> - How to add more than one state variable
> - Why state is called local
> - When a regular variable isn’t enough

> Here’s a component that renders a sculpture image. Clicking the “Next” button should show the next sculpture by changing the index to 1, then 2, and so on. However, this won’t work (you can try it!):

    import { sculptureList } from './data.js';

    export default function Gallery() {
        let index = 0;
        function handleClick() {
            index = index + 1;
        }
        let sculpture = sculptureList[index];
        return (
            <>
                <button onClick={handleClick}>
                    Next
                </button>
                <h2>
                    <i>{sculpture.name} </i>
                    by {sculpture.artist}
                </h2>
                <h3>
                    ({index + 1} of {sculptureList.length})
                </h3>
                <img src={sculpture.url} alt={sculpture.alt}/>
                <p>{sculpture.description}</p>
            </>
        );
    }

> The handleClick event handler is updating a local variable, index. But two things prevent that change from being visible:
>
> 1. **Local variables don’t persist between renders.**
>    When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
> 2. **Changes to local variables won’t trigger renders.**
>    React doesn’t realize it needs to render the component again with the new data.

To update a component with new data, two things need to happen:

1. Retain the data between renders.
2. Trigger React to render the component with new data (re-rendering).

The useState Hook provides those two things:

1. A state variable to retain the data between renders.
2. A state setter function to update the variable and trigger React to render the component again.

## Adding a state variable

To add a state variable, import useState from React at the top of the file:

    import {useState} from 'react';

Then, replace this line:

    let index = 0;

with

    const [index, setIndex] = useState(0);

> > > The [ and ] syntax here is called **array destructuring** and it lets you read values from an array. The array returned by useState always has exactly two items.

> This is how they work together in handleClick:
>
>       function handleClick() {
>           setIndex(index + 1);
>       }

## Meet your first Hook

In React, useState, as well as any other function starting with "use", is called a Hook.

Hooks are special functions that are only available while React is rendering (which we'll get into in more detail on the next page.). _They let you "hook into" different React features._

State is just one of those features, but you'll meet the other Hooks late.

> **Pitfall:**
>
> **Hooks — functions starting with use — can only be called at the top level of your components or your own Hooks.**
>
> You can’t call Hooks inside conditions, loops, or other nested functions.
>
> Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs.

You “use” React features at the top of your component similar to how you “import” modules at the top of your file.

## Anantomy of useState

When you call useState, you are telling React that you want this component to remember something:

    const [index, setIndex] = useState(0);

In this case, you want React to remember index.

> The convention is to name this pair like const [something, setSomething]. You could name it anything you like, but the conventions make things easier to understand across projects.

The only argument to useState is the **initial value** of your state variable.

Every time your component renders, useState gives you an array containing two values:

1. The **state variable** (index) with the value you stored.
2. The **state setter function** (setIndex) which can update the state variable and trigger React to render the component again.

> Here is how that happens in action:
>
>       const [index, setIndex] = useState(0);
>
> 1. **Your component renders the first time.** Because you passed 0 to useState as the initial value for index, it will return [0, setIndex]. React remembers 0 is the latest state value.
> 2. **You update the state.** When a user clicks the button, it calls setIndex(index + 1). index is 0, so it’s setIndex(1). This tells React to remember index is 1 now and triggers another render.
> 3. Your component’s second render. React still sees useState(0), but because React remembers that you set index to 1, it returns [1, setIndex] instead.
> 4. And so on!

## Giving a component multiple state variables

You can have as many state variables of as many types as you like in one component.

It is a good idea to have multiple state variables if their state is unrelated.  
But if you find that often you change two state variables together, it might be easier to combine them into one.

> For eg, if you have form with many fields, it's more convenient to have a single state variable that holds an object than state variable per field.

#### How does React know which state to return?

You might have noticed that the useState call does not receive any information about which state variable it refers to.

There is no “identifier” that is passed to useState, so how does it know which of the state variables to return? Does it rely on some magic like parsing your functions? The answer is no.

> Instead, to enable their concise syntax, Hooks rely on a stable call order on every render of the same component.
>
> This works well in practice because if you follow the rule above (“only call Hooks at the top level”), Hooks will always be called in the same order.
>
> Additionally, a [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) catches most mistakes.

- Internally, React holds an array of state pairs for every component.
- It also maintains the current pair index, which is set to 0 before rendering.
- Each time you call useState, React gives you the next state pair and increments the index. You can read more about this mechanism in [React Hooks: Not Magic, Just Arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e).

## State is isolated and private

State is local to a component instance on the screen. In other words, **if you render the same component twice, each copy will have completely isolated state!**

Changing one of them will not affect the the other.

> This is what makes state different from regular variables that you might declare at the top of your module.
>
> State is not tied to a particular function call or a place in the code, but it's local to the specific place on the screen.

Unlike props, state is fully private to the component declaring it.  
(the parent component can't change it.)  
This lets you add state to any component or remove it without impacting the rest of the components.

> What if you wanted to keep two component state into sync?
>
> > > The right way to do it in React is to remove state from child components and add it to their closed shared parent.
