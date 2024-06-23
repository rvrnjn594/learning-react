## Writing Markup with JSX

#### JSX is syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.

    You will learn:
        - Why React mixes markup with rendering logic
        - How JSX is different from HTML
        - How to display information with JSX

### JSX: Putting markup into JavaScript

###### As web became more interactive, logic increasingly determined content. JavaScript was in charge of the HTML! That is why in React, rendering logic and markup live together in the same place - components.

    Note:   Keeping a button's logic and markup
    together ensures that they stay in sync with each
    other on every edit. Conversely, details that are unrelated, such as the button's markup and a
    sidebar's markup, are isolated from each other,
    making it safer to change either of them in their
    own.

### Converting HTML to JSX

###### JSX is stricter and has a few more rules than HTML!

##### Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup.

###### JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information.

    Remember: MOST OF THE TIME, REACT'S ON-SCREEN ERROR MESSAGES WILL HELP YOU FIND WHERE THE PROBLEM IS. Give them a read if you get stuck!

### The Rules of JSX

###### 1. Return a single root element.

    - To return multiple elements from a component, wrap them with a single parent tag.
    - If you don't want to add extra <div> to your markup, you can write <> and </> instead.
    (This empty tag is called FRAGMENT. Fragment lets
    you group things without leaving any trace in the
    browser HTML tree.)

    * Why do multiple JSX tags need to be wrapped?
        - JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can't return two objects from a function without wrapping them into an array.
        This explains why you also can't return two JSX tags without wrapping them into another tag or a Fragment.

###### 2. Close all the tags.

    JSX requires tags to be explicitly closed: self-closing tags like <img> must become <img/>,
    and wrapping tags like <li>oranges must be written as <li>oranges</li>.

###### 3. camelCase all most of the things!

    * JSX turns into JavaScript and attributes written in JSX becomes keys of JavaScript objects.
    In your own components, you will often want to read those attributes into variables.
    But JavaScript has limitations on variable names. eg: their names can't contain dashes or be reserved words like class.
    * This is why in React, many HTML and SVG attributes are written in camelCase.

##### Pro-tip: Use a JSX Converter

    Converting all attributes in existing markup can be tedious!
    React recommends using a converter to translate your existing HTML and SVg to JSX.
    Converters are very useful in practice, but it's still worth understanding what is going on so that you can comfortably write JSX on your own.
