import React, { useState } from 'react';
import DepCalendar from '../components/DepCalendar'
import WeekContext from '../components/utils/WeekContext'


function DepSchedule(props) {
    const [schedule,setSchedule] = useState("")
    const currentDate = new Date
    const date = currentDate.getDate();

    const getWeekNumber =(d)=>{
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
    }

    const getDates = (startDate, stopDate) => {
        const dateArray = []
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }

    const addDays = (currDate,days) => {
        const date = new Date(currDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }    

    function getDateRangeOfWeek(weekNo){
        const d1 = new Date();
        const numOfdaysPastSinceLastMonday = eval(d1.getDay());
        d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
        const currWeek = getWeekNumber(d1)
        const weekNoToday = currWeek[1]
        const weeksInTheFuture = eval( weekNo - weekNoToday );
        d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture ));
        const rangeIsFrom = eval(d1.getMonth()+1) +"/" + d1.getDate() + "/" + d1.getFullYear();
        const start = d1
        const hey = new Date(start)
        const startArray = [hey]
        const dateArray = [...startArray]
        d1.setDate(d1.getDate() + 6);
        const rangeIsTo = eval(d1.getMonth()+1) +"/" + d1.getDate() + "/" + d1.getFullYear() ;
        const end = d1
        dateArray.push(end)
        const weekRangeString =  rangeIsFrom + " to "+rangeIsTo;
        console.log(dateArray)
        return {range:weekRangeString,dates:dateArray}
    };
    const yearAndWeek = getWeekNumber(new Date())
    const [currentWeek,setCurrentWeek] = useState(yearAndWeek[1])
    const currViewInfo = getDateRangeOfWeek(currentWeek)
    const range = getDates(currViewInfo.dates[0],currViewInfo.dates[1])
    const weekDates = range.map(date=>eval(date.getMonth()+1) +"/" + date.getDate())
    return (
        <>
            <WeekContext.Provider value={{boardId:1,setCurrentWeek}}>
                <DepCalendar boardLists={{
                    1:{id:1,title:weekDates[1],cards:[]},
                    2:{id:2,title:weekDates[2],cards:[]},
                    3:{id:2,title:weekDates[3],cards:[]},
                    4:{id:2,title:weekDates[4],cards:[]},
                    5:{id:2,title:weekDates[5],cards:[]},
                }}/>
            </WeekContext.Provider>
        </>
    );
}
export default DepSchedule;