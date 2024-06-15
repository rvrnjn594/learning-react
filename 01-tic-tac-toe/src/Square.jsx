/* 
Task:
    1. Using a value to pass as a prop in each square.
    2. Making each square component interaactive.
    3. Square component should remember it got clicked.
    4. Removing the square own state and value and pasing it as as prop from the parent component(board.)
        - What is the need for passing it as a prop?
                - Helps to calcualte winner easily. Since we can directly check the winner from the board component itself.
*/

import "./styles.css";

// Note: Each square will rececive a value prop that will be displayed in the square. ('X', 'O', null).
export default function Sqaure({ value, onSquareClick }) {
  //   function handleClick() {
  //     setValue("X");
  //   }
  //   const [value, setValue] = useState(null);
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
