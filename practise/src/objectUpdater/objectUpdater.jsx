import React, {useState} from "react"

function ObjectUpdater(){

    const [car, setCar] = useState({year: 2013,
                                    make: "Toyota",
                                    model: "Yaris"});

    function handlerYearChange(event){
        setCar(prevCar => ({...prevCar, year: event.target.value}));
    }
    
    function handlerMakeChange(event){
        setCar(prevCar => ({...prevCar, make: event.target.value}));
    }

    function handlerModelChange(event){
        setCar(prevCar => ({...prevCar, model: event.target.value}));
    }


    return(
        <div>
            <p>Your favourite car is: {car.year} {car.make} {car.model}</p>

            <input type="number" value={car.year} onChange={handlerYearChange}/> <br />
            <input type="text" value={car.make} onChange={handlerMakeChange}/> <br />
            <input type="text" value={car.model} onChange={handlerModelChange}/> <br />
        </div>
    );

}

export default ObjectUpdater