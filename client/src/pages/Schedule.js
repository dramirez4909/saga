import React, { useState } from 'react';

function Schedule(props) {
    const [schedule,setSchedule] = useState("")
    return (
        <>
            <strong>skedjule</strong>
            <input placeholder="which schedule would you like to view?" value={schedule} onChange={(e)=>setSchedule(e.target.value)}></input>
        </>
    );
}
export default Schedule;