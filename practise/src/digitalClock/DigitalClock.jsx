import React,{useState, useEffect} from "react"

function DigitalClock(){

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function formatTime() {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;

    }

    function padZero(number){
        return number = number < 10 && number >= 0 ? "0" + number : number;
    }

    return(
        <div className="clockContainer">
            <div className="Clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    );


}

export default DigitalClock