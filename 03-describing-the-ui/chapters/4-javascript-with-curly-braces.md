## JavaScript in JSX with Curly Braces

> "JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place."
>
> Sometimes you will want to add a little JavaScript logic or reference a dyanmmic property inside that markup.

In this situtation, you can use curly braces in your JSX to open a window to JavaScript.

> You will learn:
>
> - How to pass strings with quotes.
> - How to reference a JavaScript variable inside JSX with curly braces.
> - How to call a JavaScript function inside JSX with curly braces.
> - How to use a JavaScript object inside JSX with curly braces.

### Passing strings with quotes

When you want to pass a string attribute to JSX, you put it in single or double quotes.

To dynamically specify the src or alt text, you could use a value from JavaScript by replacing " and " with { and }.

### Using curly braces: A window into the JavaScript world

JSX is a special way of writing JavaScript.

That means it's possible to use JavaScript inside it - with curly braces { }.

> Where to use curly braces?
>
> You can use curly braces in two ways inside JSX:
>
> 1.  As text directly inside a JSX tag.
> 2.  As attributes immediately following the = sign.

### Using "double curlies": CSS and other objects in JSX

In addition to strings, numbers, and other JavaScript expressions, **you can even pass objects in JSX**.  
(Objects are also denoted with curly braces.)

**Therefore, to pass a JS object in JSX, you must wrap the object in another pair of curly braces.**

> You may see this with inline CSS styles in JSX. React does not require you to use inline styles (CSS classes work great for most general cases.)
>
> But when you need an inline style, you pass an object to the style attribute.

###### Pitfall:

- Inline style properties are written in camelCase.

**_JSX is very minimal as a templating language because it lets you organize data and logic using JavaScript._**
