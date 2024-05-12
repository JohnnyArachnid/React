
function Button(){

    // const handleClick = () => console.log("KYS");
    
    // return(
    //     <button onClick={handleClick}>Click me ▬▬ι═══════ﺤ</button>
    // );

    // const handleClick = name => console.log(`${name}`);
    
    // return(
    //     <button onClick={() => handleClick("Guest")}>Click me ▬▬ι═══════ﺤ</button>
    // );

    const handleClick = (event) => event.target.textContent = "Ouch!"
    
    return(
        <button onDoubleClick={(event) => handleClick(event)}>Click me ▬▬ι═══════ﺤ</button>
    );
}

export default Button