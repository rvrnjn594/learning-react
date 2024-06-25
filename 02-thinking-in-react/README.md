###### Imagine that you already have a JSON API and a mockup from a designer.

#### The JSON API returns some data that looks like this:

        [
                { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
                { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
                { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
                { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
                { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
                { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
        ]

# ----- Thinking in React -----

##### To implement UI in react, you will usually follow the same five steps:

### Step 1: Break the UI into a component hierarchy.

> - Start by drawing boxes around every component and subcomponent in the mockup and naming them. (Designer' work.)
> - Depending on your background, you can think about splitting up a design into components in different ways.
>
> > - Programming (use the same technique for deciding if you should create a new funtion or object. One such technique is the single responsibility principle, that is, a component should ideally do onething. If it ends up growing, it should be decomposed into smaller compoennts.)
>
> > - CSS (consider what you would make class selectors for. However, components are bit granular.)
>
> > - Design (consider how you would organize the design's layers.)
>
> Note: If Json is well-structured, you'll often find that it naturally maps to the component structure of your UI. (Thats because UI and models often have the same information architecture- that is, the same shape.)
>
> - Seperate your UI into components, where each component matches one piece of your data model. - There are five components on this screen:
>   > - FilterableProductTable contains the entire app.
>   >   > - SearchBar receives the user input.
>   >   > - ProductTable displays and filters the list according to the user input.
>   >   > - ProductCategoryRow displays a heading for each product.
>
> > > > ProductRow displays a row for each product.
>
> - Now you have identified the components in the mockup, arrange them into a heirarchy. (See above, the child components are listed under parent components.)

### Step 2: Build a static version in React. (Time to implement your app)

> Most straightforward approach is to build a static version that renders the UI from your data model without adding any interacticvity....yet!
>
> **\*** Building a static version requires a lot of the typing and no thinking, but adding interactivity requires a lot of thinking and not a lot of typing. **\***
>
> > - To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using props. (Props are a way of passing data from parent to child.)
>
> > > Note: Don't use state to build the static version. State is reserved only for interactivity.
>
> > - Build either top down or bottom up. (It's usually easier to go top-down in simpler examples, and on larger projects, it's easier to go bottom-up.)

##### After building your components, you'll have a library of resuable components that render your data model.

> - The component at the top of the hierarchy will take your data model as a prop. This is called ONE_WAY DATA FLOW because the data flows down from the top- level components to the ones at the bottom of the tree.

### Step 3: Find the minimal but complete representation of UI state.

> - To make your UI interactive, you need to let users change your underlying data model. (You need state for this.)
>
> > (Think of state as the minimal set of changing data that your app needs to remember. The most important principle for structuring state is to keep it DRY(Don't Repeat Yourself.))
>
> - Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand.
>
> - Now think of all the pieces of data in this application:
>
>   > 1. Product List
>   > 2. Search Text the user has entered.
>   > 3. Value of the checkbox.
>   > 4. Filtered list of products.
>
> - Identify the ones that are not states.
>   > > - Does it remain unchanged over time.
>   > > - Is it passed from a parent.
>   > > - Can you compute it based on existing state or props in your component.
>   > >   > (All these are not states.) - Only, seach input and checkbox are states.

### Step 4: Identifying where your state should live.

> - Identify which component is responsible for changing this state, or owns the state.
>   Remember: React uses one-way data flow, passing data down the component hierarchy from parent to child component...**_ It may not be immediately clear which component should own what state. Challenging step but can be figured out with these steps: _**
>
> 1.  Idetify every component that renders something based on that state.
>
> 2.  Find their closest common parent component - a component above them all in the hierarchy.
>
> 3.  Decide where the state should live.

### Step 5: Add inverse data flow.

> - To change the state according to the user input, you will need to support data flowing the other way: the form components deep in the hierarchy need to update the state in FilterableProductTable.
