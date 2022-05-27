import React from "react";

import {useState, useEffect} from "react";
import  {format} from "date-fns";
import {ru} from 'date-fns/locale';

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
        <span className="App-Header-Clock">
            <p className="App-Header-Clock-Date">{format(date, 'dd-MM-yyyy EEEE', {locale: ru})}</p>
            <p className="App-Header-Clock-Time">{date.toLocaleTimeString('ru-RU')}</p>
        </span>
    );
}

export default Clock;

