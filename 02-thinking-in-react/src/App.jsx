/*
  Product category : 
    *   FilterableProductTable contains the entire app.
        *   SearchBar receives the user input.
        *   ProductTable displays and filters the list according to the user input.
            *   ProductCategoryRow displays a heading for each product.
            *   ProductRow displays a row for each product.

  Json data to build the Static version of the app.
[
{ category: "Fruits", price: "$1", stocked: true, name: "Apple" },
{ category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
{ category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
{ category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
{ category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
{ category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

*/

import FilterableProductTable from "./components/FilterableProductTable";
const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
function App() {
  return (
    <div>
      <FilterableProductTable products={data} />
    </div>
  );
}

export default App;
