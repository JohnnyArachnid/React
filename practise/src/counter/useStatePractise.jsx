import React, {useState} from 'react'

function Practise(){

    const [name, setName] = useState("Guest");
    const [age, setAge] = useState(0);
    const [isEmployed, setEmployed] = useState(false);

    const updateName = () => {
        setName("Student");
    }

    const incrementAge = () => {
        setAge(age + 1);
    }

    const employed = () => {
        setEmployed(!isEmployed);
    }

    return(

        <div>
            <p>Name: {name}</p>
            <button onClick={updateName}>Set Name</button>
            <p>Age: {age}</p>
            <button onClick={incrementAge}>Increment Age</button>
            <p>Employed: {isEmployed ? "Yes" : "No"}</p>
            <button onClick={employed}>Toggle status</button>
        </div>

    );
}

export default Practise