import React from "react";

import {useState, useEffect} from "react";
import {getYear} from "date-fns";

function Clock () {
    const [date, setDate] = useState(new Date());

    function refreshClock() {
        setDate(new Date());
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanUp() {
            clearInterval(timerId);
        };
    }, []);


    return (
        <span className="App-Main-Clock">
            <p>{getYear(date) }-{}</p>
            <p>{date.toLocaleTimeString('ru-RU')}</p>
        </span>
    );
}

export default Clock;

