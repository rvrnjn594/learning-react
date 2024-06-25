## Importing and exporting components

> You will learn:
>
> - What a root component file is
> - How to import and export a component
> - When to use default and named imports and exports
> - How to import and export multiple components from one file
> - How to split components into multiple files

### The root component file

App.jsx. Depending on your setup, your root component could be in another file, though. If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.

### Exporing and importing a component

You can move a component in three steps:

1. Make a new JS file to put the component in.
2. Export your function component from that file (using either default or named exports).
3. Import it in the file where you'll use the component (using the corresponding technique for importing default or named exports).

#### Deafult vs named exports

**(Primary ways to export values with JavaScript)**

Can use both in same file.

** A file can have no more than one default export, but it can have as many named exports as you like.**

How you export your components dictates how you must import it.  
(You will get an error if you try to import a default export the same way you would a named export!)

> When you write a default import, you can put any name you want after the import.
>
> In contrast, with named imports, the name has to match on both sides. **That's why they are called named imports!**

**Components without names**, like export default ()=>{}, **are discouraged because they make debugging harder.**
