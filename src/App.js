import "./App.css";

// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./redux/actions";
// import { decrement, increment } from "./redux/counterSlice";
import LoginForm from "./LoginForm"; // Adjust the path based on your project structure

function App() {
  // const count = useSelector((state) => state.counter.value);

  // const dispatch = useDispatch();

  return (
    <div className="App">
      <LoginForm />
      {/* <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button> */}
    </div>
  );
}

export default App;
