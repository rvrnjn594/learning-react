# Conditional Rendering

"Your components will often need to display things depending on differnt conditions. In React, you can conditionally render JSX using Javascript syntax like **if statements, &&, and ? : operators**."

> You will learn:
> -How to return differnt JSX depending on a condition
> -How to conditionally include or exclude a piece of JSX
> -Common conditioning syntax shortcuts you'll encounter in React codebase

### Conditionally returning JSX

You can use if/else statement:

- if the condition is true, this code returns a differnt JSX tree.

**Notice:** how you're creating a branching logic with Javascript's if and return statements. In React, control flow (like conditions) is handled by Javascript.

### Conditionally returning nothing with _null_

In some situations, you won't want to render anything at all.  
A component must return something.  
**In this case, you can return null.**

> In practice, returning null from a component isn't common because it might surprise a developer trying to render it.

**More often you would conditionally include or exclude the component in the parent component's JSX.**

### Conditionally including JSX

    if (isPacked) {
        return <li className="item">{name} ✔</li>;
    }
    return <li className="item">{name}</li>;

> Both of the conditional branches return <li className="item">...</li>

While this duplication isn't harmful, it could make your code harder to maintain.  
What if you want to change the className?  
In such a situation, you could conditionally include a liitle JSX to make your code more DRY.

#### Conditional (teranary) operator (? :)

Javascript has compact syntax for writing a conditional expression - **the conditional operator or "ternary operator"**

    return (
        <li className="item">
            {isPacked ? name + "checked" : name}
        </li>
    )

> Are these two examples fully equivalent?
>
> > > If you’re coming from an object-oriented programming background, you might assume that the two examples above are subtly different because one of them may create two different “instances” of <li>.

But **JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes.**  
**_They’re lightweight descriptions, like blueprints._**

> > > So these two examples, in fact, are completely equivalent. Preserving and Resetting State goes into detail about how this works.  
> > > (Html tag <del>, to strike out.)

This style works well for simple conditions, but use it in moderation.

> If your components get messy with too much nested conditional markup, consider extracting child components to clean things up.
>
> In React, markup is a part of your code, so you can use tools like variables and functions to tidy up complex expressions.

### Logical AND operator (&&)

Another common shortcut you'll encounter is the Javascript logical AND (&&) operator.

> Inside React components, it often comes up when you want to render some JSX when the condition is true, or render nothing otherwise.

With &&, you could conditionally render the checkmark only if isPacked is true:

    return (
        <li className="item">
            {name} {isPacked && "checked"}
        </li>
    );

> A Javascript && expression returns the value of its right side (in this case, "checked" string) if the left side (conditin) is true.

React considers false as a "hole" in the JSX tree, just like null or undefined, and doesn't render anything in its place.

**Pitfall:** Don't put numbers on the left side of &&.

> To test the condition, Javascript converts the left side to a boolean automatically.
>
> However, if the left side is 0, then the whole expression gets that value (0), and React will happily render a 0 rather than nothing.
>
> > eg: a common mistake is to write code like messageCount && <p>New message</p>. It's easy to assume that it renders nothing when messageCount is 0, but it really renders the 0 itself.
>
> To fix it, make the left side a boolean: messageCount > 0 && <p>New message</p>.

### Conditionally assigning JSX to a variable

**When the shortcuts get in the way of writing plain code, try using an if statement and a variable.**

> You can reassign variables defined with let, so start by providing the default content you want to display, the name:

    let itemContent = name;

> Use an if statement to reassign a JSX expression to itemContent if isPacked is true:

    if(isPacked) {
        itemContent = name + "checked";
    }

> Curly braces open the "window into javascript". Embed the variable with curly braces in the returned JSX tree, nesting the previously calculated expression inside the JSX:

    <li className="item">
        {itemContent}
    </li>

> The style is most verbose, but it's also most flexible.

Like before, this works not only for text, but for arbitrary JSX too.
