# Adding Interactivity

> Some things on the screen update in response to user input.
>
> For example, clicking an image gallery switches the active image.

**In React, data that changes over time is called state.**

> You can add state to any component, and update it as needed.
>
> In this chapter, you’ll learn how to write components that handle interactions, update their state, and display different output over time.

> - How to handle user-initiated events
> - How to make components “remember” information with state
> - How React updates the UI in two phases
> - Why state doesn’t update right after you change it
> - How to queue multiple state updates
> - How to update an object in state
> - How to update an array in state

## Responding to events

React lets you add event handlers to your JSX.

**Event handlers are your own functions that will be triggered in response to user interactions** **_like clicking, hovering, focusing on form inputs, and so on._**

Built-in components like <button> only support built-in browser events like onClick.

However, you can also create your own components, and give their event handler props any application-specific names that you like.

## State: a component's memory

Components often need to change what’s on the screen as a result of an interaction.

> Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” puts a product in the shopping cart.
>
> Components need to “remember” things: the current input value, the current image, the shopping cart.

In React, **this kind of component-specific memory is called state.**

**You can add state to a component with a useState Hook.**

> **_Hooks are special functions that let your components use React features_**(state is one of those features).
>
> The useState Hook lets you declare a state variable. It takes the initial state and returns a pair of values: the current state, and a state setter function that lets you update it.

## Render and commit

Before your components are displayed on the screen, they must be rendered by React.

> Understanding the steps in this process will help you think about how your code executes and explain its behavior.

> Imagine that your components are cooks in the kitchen, assembling tasty dishes from ingredients.
>
> In this scenario, React is the waiter who puts in requests from customers and brings them their orders.

> **This process of requesting and serving UI has three steps:**
>
> - **Triggering a render** (delivering the diner’s order to the kitchen)
> - **Rendering the component** (preparing the order in the kitchen)
> - **Committing to the DOM** (placing the order on the table)

![rendering process](https://react.dev/images/docs/illustrations/i_render-and-commit2.png)

## State as a snapshot

Unlike regular Javascript variables, **React state behaves more like a snapshot.**

**Setting it does not change the state variable you already have, but instead triggers a re-render.**  
This can be surprising at first!

    console.log(count); // 0
    setCount(count + 1); Request a re-render with 1
    console.log(count);

This behavior help you avoid subtle bugs.

## Queueing a series of state updates

This component is buggy: clicking "+3" increments the score only once.

    import { useState } from 'react';

    export default function Counter() {
    const [score, setScore] = useState(0);
    function increment() {
        setScore(score + 1);
    }
        return (
            <>
                <button onClick={() => increment()}>+1</button>
                <button onClick={() => {
                    increment();
                    increment();
                    increment();
                }}>+3</button>
                <h1>Score: {score}</h1>
            </>
        )
    }

> State as a snapshot explains why this is happening.
>
> Setting state requests a new re-render, but does not change it in the already running code.
>
> So score continues to be 0 right after you call setScore(score + 1).

You can fix this by passing an updater function when setting state.

Notice how replacing setScore(score + 1) with setScore(s => s + 1) fixes the “+3” button.

This lets you queue multiple state updates.

    import { useState } from 'react';

    export default function Counter() {
        const [score, setScore] = useState(0);
        function increment() {
            setScore(s => s + 1);
        }
        return (
            <>
                <button onClick={() => increment()}>+1</button>
                <button onClick={() => {
                    increment();
                    increment();
                    increment();
                }}>+3</button>
                <h1>Score: {score}</h1>
            </>
        )
    }

## Updating objects in state

State can hold any kind of JavaScript value, including objects.

> But you shouldn’t change objects and arrays that you hold in the React state directly.
>
> Instead, **when you want to update an object and array, you need to create a new one _(or make a copy of an existing one)_, and then update the state to use that copy.**

Usually, you will **_use the ... spread syntax to copy objects and arrays that you want to change_**.

If copying objects in code gets tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code.

**_Defintely check out [Immer Module](https://github.com/immerjs/use-immer)_**

## Updating arrays in state

Arrays are another type of mutable Javascript objects you can store in state and should treat as read-only.

Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.
