import React, {useState} from "react";

function Counter(){

    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        // setCounter(prevCounter => prevCounter + 1);
        // setCounter(prevCounter => prevCounter + 1);
        // setCounter(prevCounter => prevCounter + 1);
        setCounter(counter+1);
    }
    const decrementCounter = () => {
        setCounter(counter-1);
    }
    const resetCounter = () => {
        setCounter(0);
    }

    return(
        <div className="counterCointaner">
            <p className="counterDisplay">{counter}</p>
            <button className="counterButton" onClick={incrementCounter}>Increment</button>
            <button className="counterButton" onClick={resetCounter}> Reset</button>
            <button className="counterButton" onClick={decrementCounter}>Decrement</button>
        </div>
    );

}

export default Counter