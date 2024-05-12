import React, {useState} from "react"

function ColorPicker(){

    const [color, setColor] = useState("#000000");

    function handlerColorChange(event){
        setColor(event.target.value);
    }

    return(
        <div className="colorPickerCointainer">
            <h1>Color Picker</h1>
            <div className="colorDisplay" style={{backgroundColor: color}}>
                <p>Selected Color: {color}</p>
            </div>
            <label>Select a color:</label>
            <input type="color" value={color} onChange={handlerColorChange} />
        </div>
    );

}

export default ColorPicker