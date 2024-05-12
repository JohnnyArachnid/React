import React, {useState} from "react"

function MyComponent(){

    const [cars, setCars] = useState([{year: 2013, model: "Yaris", make: "Toyota"}]);
    const [carYear, setCarYear] = useState(new Date().getFullYear());
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");

    function handleAddCar() {
        
        const newCar = {year: carYear,
                        model: carModel,
                        make: carMake};

        setCars(prevCars => [...prevCars, newCar]);

        setCarYear(new Date().getFullYear());
        setCarMake("");
        setCarModel("");
    }

    function handleRemoveCar(index) {
        setCars(cars.filter((_, i) => i !== index));
    }


    function handleYearChange(event) {
        setCarYear(prevYear => prevYear = event.target.value)
    }


    function handleMakeChange(event) {
        setCarMake(prevMake => prevMake = event.target.value)
    }


    function handleModelChange(event) {
        setCarModel(prevModel => prevModel = event.target.value)
    }

    return(
        <div>
            <h2>List of Car Objects:</h2>
            <ul>{cars.map((car, index) => <li key={index} onClick={() => handleRemoveCar(index)}>{car.year} {car.make} {car.model}</li>)}</ul>
            <input type="number" value={carYear} onChange={handleYearChange}></input><br />
            <input type="text" value={carModel} onChange={handleModelChange} placeholder="Enter car model:"></input><br />
            <input type="text" value={carMake} onChange={handleMakeChange} placeholder="Enter car model:"></input><br />
            <button onClick={handleAddCar}>Add car</button>
        </div>
    );
}

export default MyComponent