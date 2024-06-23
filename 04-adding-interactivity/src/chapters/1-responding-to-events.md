# Responding to Events

React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on.

> You will learn:
>
> - Different ways to write an event handler
> - How to pass event handling logic from a parent component
> - How events propagate and how to stop them

## Adding event handlers

To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag.

    export default function Button() {
        function handleClick() {
            alert('You clicked me!');
        }
        return (
            <button onClick={handleClick}>
                Click me
            </button>
        );
    }

> You defined the handleClick function and then passed it as a prop to <button>. **handleClick is an event handler**.
>
> Event handler functions:
>
> - Are usually defined inside your components.
> - Have names that start with handle, followed by the name of the event.
>
> By convention, it is common to name event handlers as handle followed by the event name. You’ll often see onClick={handleClick}, onMouseEnter={handleMouseEnter}, and so on.

Alterantively, you can define an event handler inline in the JSX:

    <button onClick={function handleClick() {
        alert('You clicked me!');
    }}>

Or, concisely, using an arrow funtion:

    <button onClick={()=>alert('You clicked me!');}>

All theses styles are equivalent. **_Inline event handlers are convenient for short functions._**

> **Pitfall:**
>
> Functions passed to event handlers must be passed, not called.
> For example:
>
> passing a function (correct) | calling a function (incorrect)
> <button onClick={handleClick}> | <button onClick={handleClick()}>
>
> The difference is subtle.
> In the first example, the handleClick function is passed as an onClick event handler. **This tells React to remember it and only call your function when the user clicks the button.**
>
> In the second example, the () at the end of handleClick() fires the function immediately during rendering, without any clicks. **This is because JavaScript inside the JSX { and } executes right away.**

> When you write code inline, the same pitfall presents itself in a different way:
>
> passing a function (correct) | calling a function (incorrect)
> <button onClick={() => alert('...')}> | <button onClick={alert('...')}>
>
> Passing inline code like this won’t fire on click — it fires every time the component renders:
>
>       // This alert fires when the component renders, not when clicked!
>       <button onClick={alert('You clicked me!')}>
>
> If you want to define your event handler inline, wrap it in an anonymous function like so:
>
>       <button onClick={() => alert('You clicked me!')}>
>
> Rather than executing the code inside with every render, this creates a function to be called later.
>
> In both cases, what you want to pass is a function:
>
> <button onClick={handleClick}> passes the handleClick function.
> <button onClick={() => alert('...')}> passes the () => alert('...') function.

## Reading props in event handlers

Because event handlers are declared inside of a component, they have access to the component's props.

## Passing event handlers as props

Often you’ll want the parent component to specify a child’s event handler.

> Consider buttons: depending on where you’re using a Button component, you might want to execute a different function—perhaps one plays a movie and another uploads an image.

To do this, pass a prop the component receives from its parent as the event handler.

If you use a [design system](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969), it's common for components like buttons to contain styling but not specify behavior.

## Naming event handler props

> Built-in components like <button> and <div> only support browser event names like onClick.
>
> However, when you're building your own components, you can name their event handler props any way that you like.
>
> By convention, event handler props should start with on, followed by a capital letter.
>
> When your component supports multiple interactions, you might name event handler props for app-specific concepts.

    export default function App() {
        return (
            <Toolbar
            onPlayMovie={() => alert('Playing!')}
            onUploadImage={() => alert('Uploading!')}
            />
        );
    }

    function Toolbar({ onPlayMovie, onUploadImage }) {
        return (
            <div>
                <Button onClick={onPlayMovie}>
                    Play Movie
                </Button>
                <Button onClick={onUploadImage}>
                    Upload Image
                </Button>
            </div>
        );
    }

    function Button({ onClick, children }) {
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }

> Notice how the App component does not need to know what Toolbar will do with onPlayMovie or onUploadImage.
>
> That’s an implementation detail of the Toolbar.
>
> Here, Toolbar passes them down as onClick handlers to its Buttons, but it could later also trigger them on a keyboard shortcut. Naming props after app-specific interactions like onPlayMovie gives you the flexibility to change how they’re used later.

## Event propagation

Event handlers will also catch events from any children your component might have.

> We say that an event "bubbles" or "propagate" up the tree: it starts with where the event happened, and then goes up the tree.

**Pitfall:** All events propagate in React except onScroll, which only works on the JSX tag you attach it to.

## Stopping propagation

Event handlers receive an event object as their only argument.

> By convention, it's usually called e, which stands for "event". You can use this object to read information about the event.

That event object also lets you stop the propagation.

> If you want to prevent an event from reaching parent components, you need to call e.stopPropogation().

#### Capture phase events

In rare cases, you might need to catch all events on child elements, even if they stopped propagation.

> For example, maybe you want to log every click to analytics, regardless of the propagation logic. You can do this by adding Capture at the end of the event name:
>
>       <div onClickCapture={() => { /* this runs first */ }}>
>           <button onClick={e => e.stopPropagation()} />
>           <button onClick={e => e.stopPropagation()} />
>       </div>
>
> Each event propagates in three phases:
>
> 1.  It travels down, calling all onClickCapture handlers.
> 2.  It runs the clicked element's onClick handler.
> 3.  It travels upwards, calling all onClick handlers.
>
> Capture events are useful for code like routers or analytics, but you probably won't use them in app code.

## Passing handlers as alternative to propagation

Notice how this click handler runs a line of code and then calls the onClick prop passed by the parent:

    function Button({onClick, children}) {
        return (
            <button onClick={e => {
                e.stopPropogation();
                onClick();
            }}>
                {children}
            </button>
        )
    }

> You could add more code to this handler before calling the parent onClick event handler, too.
>
> This pattern provides an alternative to propagation.  
> It lets the child component handle the event, while also letting the parent component specify some additional behavior.
>
> Unlike propogation, it's not automatic. But the benefit of this pattern is that you can clearly follow the whole chain of code that executes as a result of some event.

If you rely on propagation and it's difficult to trace which handlers execute and why, try this approach instead.

## Preventing default behavior

Some browsers events have default behavior associated with them.

> For eg: a <form> submit event, which happens when a button inside of it is clicked, will reload the whole page by default:
>
>       export default function Signup() {
>           return (
>               <form onSubmit={() => alert('Submitting!')}>
>                   <input />
>                   <button>Send</button>
>               </form>
>           );
>       }
>
> You can call the e.preventDefault() on the event object to stop this from happening.

Don't confuse e.stopPropogation() and e.preventDefault().  
They both are useful, but unrelated:

- [e.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) stops the event handlers attached to the tags above from firing.
- [e.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) prevents the default browser behavior for the few events that have it.

## Can event handlers have side effects?

Absolutely! **Event handlers are the best place for side effects.**

> Unlike rendering functions, event handlers don’t need to be pure, so it’s a great place to change something—for example, change an input’s value in response to typing, or change a list in response to a button press.
>
> However, in order to change some information, you first need some way to store it. In React, this is done by using state, a component’s memory. You will learn all about it on the next page.
