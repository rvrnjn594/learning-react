# Keeping Components Pure

"Some Javascript functions are _pure._ **Pure functions only perform a calculation and nothing more.** By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. To get these benefits, though, there are a few rules you must follow."

> You will learn:
>
> - What purity is and how it helps you avoid bugs
> - How to keep components pure by keeping changes out of the render phase
> - How to use Strict Mode to find mistakes in your components

### Purity : Components as formulas

In computer science (and specially the world of funtional programming), **a pure function is a function with the following criteria:**

- **It minds its own business.**
  It does not change any objects or variables that existed before it was called.
- **Same inputs, same output.**
  Given the same inputs, a pure function should always return the same result.

React is designed around this concept.  
**React assumes that every component you write is a pure function.**

> This means that React components you write must always return the same JSX given the same inputs.  
> (Just like math formula.)
>
> > > You could think of your components as recipes: if you follow them and don't introduce new ingredients during the coooking process, you will get the same dish every time. That "dish" is the JSX that the component serves to React to render.

### Side Effects: (un)intended consequences

React's rendering process must always be pure.

Components should only return their JSX, and not change any objects or variables that existed before rendering - that would make them impure.

> In general, you should not expect your components to be rendered in any particular order.
>
> > > It doesn’t matter if you call y = 2x before or after y = 5x: both formulas will resolve independently of each other.

In the same way, **each component should only “think for itself”, and not attempt to coordinate with or depend upon others during rendering.**

> Rendering is like a school exam: each component should calculate JSX on their own!

---

#### Detecting impure calculations with StrictMode

Although you might not have used them all yet, in React **there are three kinds of inputs that you can read while rendering: props, state, and context**.  
(you should always treat these inputs as read-only.)

When you want to change something in response to user input, you should set state instead of writing to a variable. **You should never change preexisting variables or objects while your component is rendering.**

React offers a "Strict Mode" in which it calls each component's function twice during development.

**_By calling the component function twice, Strict Mode helps find components that break these rules._**

> Pure functions only calculate, so calling them twice won't change anything.

**Strict Mode has no effect in production, so it won't slow down the app for your users.**

To opt into Strict Mode, you can wrap your root components into <React.StrictMode>. _Some frameworks do this by default._

---

### Local mutation: Your component's little secret

In the above example, the problem was that the component changed a preexisting variable while rendering.

**This is often called a "mutation" to make it sound a bit scarier.**

> Pure functions don't mutate variables outside of the function's scope or objects that were created before the call - that makes them impure!

However, **it's completely fine to change variables and objects that you've just created while renderings.**

> In this example, you create an [] array, assign it to a cups variable, then push a dozen cups into it:

    function Cup({ guest }) {
        return <h2>Tea cup for guest #{guest}</h2>;
    }

    export default function TeaGathering() {
        let cups = [];
        for (let i = 1; i <= 12; i++) {
            cups.push(<Cup key={i} guest={i} />);
        }
        return cups;
    }

> If the cups variable or the [] array were created outside the TeaGathering function, this would be a huge problem!  
> (you would be changing a preexisting object by pushing items into that array.)
>
> However, it's fine because you've created them during the same render, inside TeaGathering. No code outside of TeaGathering will ever know that this happened.

**This is called "local mutation" - it's like your component's little secret.**

### Where you can cause side effects

> While functional programming relies heavily on purity, at some point, somewhere, something has to change.  
> That’s kind of the point of programming!

These changes—updating the screen, starting an animation, changing the data — are called **side effects**.

> They’re things that happen “on the side”, not during rendering.

**In React, side effects usually belong inside event handlers.**

> Event handlers are functions that React runs when you perform some action—for example, when you click a button.
>
> Even though event handlers are defined inside your component, they don’t run during rendering! So event handlers don’t need to be pure.

**If you’ve exhausted all other options and can’t find the right event handler for your side effect, you can still attach it to your returned JSX with a useEffect call in your component.**

> This tells React to execute it later, after rendering, when side effects are allowed. However, this approach should be your last resort.

When possible, try to express your logic with rendering alone. You’ll be surprised how far this can take you!

---

#### Why does React care about purity?

Writing pure functions takes some habit and discipline.

But it also unlocks marvelous oppurtunities:

- **Your components could run in a different environment** - for eg, on the server! Since they return the same result for the same inputs, one component can serve many users requests.
- **You can improve performance by skipping rendering components whose inputs have not changed.** This is safe because pure functions always return the same results, so they are safe to cache.
- **If some data changes in the middle of rendering a deep component tree, React can restart rendering without wasting time to finish the outdated render.** Purity makes it safe to stop calculating at any time.

Every new React feature we're building takes advantage of purity.  
**From data fetching to animations to performance, keeping components pure unlocks the power of the React paradigm.**

---
