## Core concepts of React - components.

#### They are foundation upon which you build user interfaces (UI), which makes them the perfect place to

#### start you React journey.

    - What will you learn?
            - What a component is
            - What role components play in a React application
            - How to write your first React component

### Components: UI building blocks

###### React lets you combine your markup, CSS, and JavaScript into custom "components", reusable UI elements for your app.

#### You can even jumpstart your project with thousands of components shared by the React open source community like CHAKRA UI and MATERIAL UI.

### Defining a component

###### Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling some JavaScript.

###### React puts interactivity first while still using the same technology:

    - A React component is a JavaScript function that you can sprinkle with markup.
    - Here's how to build a component:
        - Step 1: Exporting the component.
        - Step 2: Define the function.
                NOTE: React components are regular JavaScript functions, but their names
                must start with a capital letter or they won't work.
        - Step 3: Add markup.
                - If your markup isn't all on the same line as the return keyword, you must
                wrap it in a pair of parentheses.
                (Without parentheses, any codee on the lines after return will be ignored.)

### Using a component

###### You can nest component inside other components.

### Nesting and organizing components

###### Components are regular JavaScript functions, so you can keep multiple components in the same files. This is convenient when components are relatively small or tightly related to each other.

##### Pitfall: Components can render other components, but you must never nest their definitions. (This can cause bugs and is very slow.)

###### Instead, define a component at the top level. When passing a child component needs some data from a parent, pass it by props instead of nesting definitions.

    Components all the way down:
        - React applications begin at a "root" component. Created at project start-up.
        - Most react apps use the components all the way down. Components are a handy way to
        organize UI code and markup, even if some of them are only used once.
        - React based frameworks- Instead of using an empty HTML file and letting React "take over"
        managing the page with JavaScript, they also generate the HTML automatically from your React
        components. This allows app to show content before JavaScript code loads.

###### Many websites only use React to add interactivity to existing HTML pages. They have many root components instead of a single one for the entire page. You can use as much - or as little - React as you need.
