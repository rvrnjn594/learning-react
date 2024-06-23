# Understanding Your UI as a Tree

> "Your React app is taking shape with many components being nested within each other. How does React keep track of your app's component structure?"

**React and many other UI libraries, model UI as a tree.**  
Thinking of your app as a tree is useful for understanding the relationship between components.

> This understanding will help you debug future concepts like performance and state management.

> You will learn:
>
> - How React "sees" component structure
> - What a render tree is and what it is useful for
> - What a module dependency tree is and what it is useful for

### Your UI as a tree

Trees are relationship model between items and UI is often represented using tree structures.

> for eg: browsers use tree structures to model HTML(DOM) and CSS(CSSDOM). Mobile platforms also use trees to represent their view hierarchy.

![UI tree](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_dom_tree.png&w=1920&q=75)

Like browsers and mobile platforms, React also uses tree structures to manage and model the relationship between components in a React app.

> These trees are useful tools to understand how data flows through a React app and how to optimize rendering and app size.

### The Render Tree

A major feature of components is the ability to compose components of other components.  
 As we nest components, we have the concept of parent and child components, where each parent component may itself be a child of another component.

**When we render a React app, we can model this relationship in a tree, known as the render tree.**

![UI tree, composed of the rendered components](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Frender_tree.png&w=1080&q=75)

> From the [example](https://react.dev/learn/understanding-your-ui-as-a-tree) we can construct the above render tree.
>
> The tree is composed of nodes, each of which represents a component. App, FancyText, Copyright, to name a few, are all nodes in our tree.

The root node in a React render tree is the root component of the app.

> In this case, root component is App and it is the first component React renders. Each arrow in the tree points from a parent component to a child component.

A render tree represents a single render pass of a React application.  
(With conditional rendering, a parent component may render differnt children depending on the data passed.)

![conditional rendering, across different renders, the render tree may render different components](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fconditional_render_tree.png&w=1200&q=75)

> In the above example, depending on what inspiration.type is, we may render <FancyText> or <Color>. The render tree may be different for each render pass.
>
> Although render trees may differ across render passes, these passes are generally helpful for identifying what the top-level and leaf components are in a React app.

**Top-level components** are the components nearest to the root component and affect the rendering performance of all the components beneath them and often contain the most complexity.

**Leaf components** are near the bottom of the tree and have no child components and are often frequently re-rendered.

> Identifying these categories of components are useful for understanding data flow and performance of your app.

---

##### Where are the HTML tags in the render tree?

You’ll notice in the above render tree, there is no mention of the HTML tags that each component renders.  
This is because the render tree is only composed of React components.

React, as a UI framework, is platform agnostic.

- On react.dev, we showcase examples that render to the web, which uses HTML markup as its UI primitives.
- But a React app could just as likely render to a mobile or desktop platform, which may use different UI primitives like UIView or FrameworkElement.

These platform UI primitives are not a part of React. React render trees can provide insight to our React app regardless of what platform your app renders to.

---

### The Module Dependency Tree

Another relationship in a React app that can be modeled with a tree are an app's module dependencies.

> As we break up our components and logic into seperate files, we create JS modules where we may export components, functions, or constants.

Each node is a module dependency tree is a module and each branch represents an import statement in that module.

> If we take the previous Inspirations app, we can build a module dependency tree, or dependency tree for short.

![module dependency tree](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fmodule_dependency_tree.png&w=1920&q=75)

**The root node of the tree is the root module, also known as the entrypoint file.**  
(It often is the module that contains the root component.)

> Comparing to the render tree of the same app, there are similar structures but some notable differences:
>
> - The nodes that make-up the tree represent modules, not components.
> - Non-component modules, like inspirations.js, are also represented in this tree. The render tree only encapsulates components.
> - Copyright.js appears under App.js but in the render tree, Copyright, the component, appears as a child of InspirationGenerator. This is because InspirationGenerator accepts JSX as children props, so it renders Copyright as a child component but does not import the module.

**Dependency trees are useful to determine what modules are necessary to run your React app.**

###### Bundlers

> When building a React app for production, there is typically a build step that will bundle all the necessary JavaScript to ship to the client.

**The tool responsible for this is called a bundler, and bundlers will use the dependency tree to determine what modules should be included.**

As your app grows, often the bundle size does too.

> Large bundle sizes are expensive for a client to download and run.
>
> Large bundle sizes can delay the time for your UI to get drawn.
>
> Getting a sense of your app’s dependency tree may help with debugging these issues.

---

### Recap

1. Trees are a common way to represent the relationship between entities. They are often used to model UI.
2. Render trees represent the nested relationship between React components across a single render.
3. With conditional rendering, the render tree may change across different renders. With different prop values, components may render different children components.
4. Render trees help identify what the top-level and leaf components are. Top-level components affect the rendering performance of all components beneath them and leaf components are often re-rendered frequently. Identifying them is useful for understanding and debugging rendering performance.
5. Dependency trees represent the module dependencies in a React app.
6. Dependency trees are used by build tools to bundle the necessary code to ship an app.
7. Dependency trees are useful for debugging large bundle sizes that slow time to paint and expose opportunities for optimizing what code is bundled.
