# State as a Snapshot

State variables might look like regular JavaScript variables that you can read and write to.  
**However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.**

> You will learn
>
> - How setting state triggers re-renders
> - When and how state updates
> - Why state does not update immediately after you set it
> - How event handlers access a “snapshot” of the state

## Setting state triggers renders

> You might think of your user interface as changing directly in response to the user event like a click.
>
> In React, it works a little differently from this mental model.
>
> On the previous page, you saw that setting state requests a re-render from React.

This means that for an interface to react to the event, you need to update the state.

> Let's take a closer look at the relationship between state and rendering.

## Rendering takes a snapshot in time

“Rendering” means that React is calling your component, which is a function.

> The JSX you return from that function is like a snapshot of the UI in time. Its props, event handlers, and local variables were all calculated using its state at the time of the render.
>
> Unlike a photograph or a movie frame, the UI “snapshot” you return is interactive. It includes logic like event handlers that specify what happens in response to inputs.
>
> React updates the screen to match this snapshot and connects the event handlers. As a result, pressing a button will trigger the click handler from your JSX.

When React re-renders a component:

1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot your function returned.

> As a component’s memory, state is not like a regular variable that disappears after your function returns.
>
> > State actually “lives” in React itself—as if on a shelf!—outside of your function.
>
> > When React calls your component, it gives you a snapshot of the state for that particular render.
>
> > Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated **using the state values from that render!**

[understanding better](https://react.dev/images/docs/illustrations/i_state-snapshot2.png)

**_Setting state only changes it for the next render._**

## State over time (imp)

    import { useState } from 'react';

    export default function Counter() {
        const [number, setNumber] = useState(0);
        return (
            <>
                <h1>{number}</h1>
                <button onClick={() => {
                    setNumber(number + 5);
                    alert(number);
                }}>+5</button>
            </>
        );
    }

If you use the substitution method from before, you can guess that the alert shows “0”:

    setNumber(0 + 5);
    alert(0);

But what if you put a timer on the alert, so it only fires after the component re-rendered? Would it say “0” or “5”? Have a guess!

    import { useState } from 'react';

    export default function Counter() {
        const [number, setNumber] = useState(0);
        return (
            <>
            <h1>{number}</h1>
            <button onClick={() => {
                setNumber(number + 5);
                setTimeout(() => {
                alert(number);
                }, 3000);
            }}>+5</button>
            </>
        )
    }

Surprised? If you use the substitution method, you can see the “snapshot” of the state passed to the alert.

    setNumber(0 + 5);
    setTimeout(() => {
        alert(0);
    }, 3000);

> The state stored in React may have changed by the time the alert runs, but it was scheduled using a snapshot of the state at the time the user interacted with it!

**A state variable’s value never changes within a render,** even if its event handler’s code is asynchronous.

> Inside that render’s onClick, the value of number continues to be 0 even after setNumber(number + 5) was called. Its value was “fixed” when React “took the snapshot” of the UI by calling your component.

**React keeps the state values “fixed” within one render’s event handlers.**  
You don’t need to worry whether the state has changed while the code is running.

> But what if you wanted to read the latest state before a re-render? You’ll want to use a state updater function, covered on the next page!

##### Recap

- Setting state requests a new render.
- React stores state outside of your component, as if on a shelf.
- When you call useState, React gives you a snapshot of the state for that render.
- Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
- Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.
- You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
