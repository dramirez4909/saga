import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import DepCalendar from '../components/DepCalendar'
import WeekContext from '../components/utils/WeekContext'
import '../styles/schedule.css'


function DepSchedule(props) {

    const defaultProps = {
        className: "layout",
        rowHeight: 8,
        margin:[1,1],
        onLayoutChange: function() {},
        preventCollision: true,
        verticalCompact: false,
        cols: 5,
      };
    
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
        return {range:weekRangeString,dates:dateArray}
    };
    const yearAndWeek = getWeekNumber(new Date())
    const [currentWeek,setCurrentWeek] = useState(yearAndWeek[1]-1)
    const currViewInfo = getDateRangeOfWeek(currentWeek)
    const range = getDates(currViewInfo.dates[0],currViewInfo.dates[1])
    const weekDates = range.map(date=>eval(date.getMonth()+1) +"/" + date.getDate())
    const weekDays = weekDates.slice(1,6)
    
    const hours = ["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm"]

    const encounters = useSelector(state=>state.encounters.my_encounters)
    console.log("encounters",encounters)
    const eventLayout = [{x:0,y:0,i:"0",h:2,w:5,static:true},{x:0,y:44,i:"1",h:2,w:5,static:true}]
    Object.values(encounters).forEach((encounter,index)=>{
        const newEncounterCard = {x:"",y:"",w:1,h:"",i:`${index + 2}`,minW: 1,maxW:1,encounter,patient:encounter.patient,start:"",end:""}
        const dateStartArr = encounter.start.split(" ")
        dateStartArr.pop()
        const newStartDateNoTZ = dateStartArr.join(" ")
        const encStartTime = new Date(newStartDateNoTZ)
        const day = encStartTime.getDay()
        newEncounterCard.x = day - 1
        const hour = encStartTime.getHours()
        const minutes = encStartTime.getMinutes()
        newEncounterCard.start = `${hour}:${minutes}`
        console.log(hour,minutes)
        const hourMark = ((4*(hour - 8)) + 2) + (minutes/15)
        newEncounterCard.y = hourMark
        const dateEndArr = encounter.end.split(" ")
        dateEndArr.pop()
        const newEndDateNoTZ = dateEndArr.join(" ")
        const encEndTime = new Date(newEndDateNoTZ)
        const endHour = encEndTime.getHours()
        const endMinutes = encEndTime.getMinutes()
        newEncounterCard.end = `${endHour}:${endMinutes}`
        const endHourMark = ((4*(endHour - 8)) + 2) + (endMinutes/15)
        newEncounterCard.h = endHourMark - hourMark
        console.log("encCARD!",newEncounterCard)
        console.log("encStartTime",encStartTime)
        eventLayout.push(newEncounterCard)
    })
    const [encountersToDisplay,setEncountersToDisplay] = useState(eventLayout)
    const [oldLayout,setOldLayout] = useState(encountersToDisplay)
    const [events,setEvents] = useState(encountersToDisplay)

    const updateLayout=(e)=>{
        const difference = oldLayout.filter((el,index)=>el.x !== e[index].x || el.y !== e[index].y || el.h !== e[index].h)
        setOldLayout(encountersToDisplay)
        console.log(difference)
        const newEvents = [...encountersToDisplay]
        newEvents.forEach((event,index) => {
            event.x = e[index].x
            event.y = e[index].y
            event.w = e[index].w
            event.h = e[index].h
        })
        setEvents(newEvents)
        console.log(newEvents)
      }
    
    return (
        <>
            <WeekContext.Provider value={{updateLayout}}>
            <div style={{display:"grid", gridTemplateColumns: ".05% 99.95%", gridTemplateRows: "3% 97%"}}>
                <div style={{gridColumnStart:"2",gridColumnEnd:"3",gridRowStart:"2",gridRowEnd:"3",display:"grid", gridTemplateColumns: "3% 97%", gridTemplateRows: "3.5% 95% 2%", margin:"20px", border:"2px solid ivory", borderRadius:"7px",boxShadow: "rgba(0,0,0,0.1) 0 0 10px"}}>
                <div style={{gridColumnStart:"2",gridColumnEnd:"3",gridRowStart:"1",gridRowEnd:"2", display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "1fr",}}>
                    {weekDays.map((date,index)=>{
                        return (
                            <div  key={index} style={{display:"flex",alignItems:"center",justifyContent:"center",gridColumnStart:index + 1,gridColumnEnd:`${index+2}`,gridRowStart:"1",gridRowEnd:"2"}}>{date}</div>
                        )
                    })}
                </div>
                <div style={{gridColumnStart:"1",gridColumnEnd:"2",gridRowStart:"2",gridRowEnd:"3", display:"grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr repeat(11,2fr) 1fr",height:"100%"}}>
                    {hours.map((hour,index)=>{
                        return (
                            <div key={index} style={{display:"flex",alignItems:"center",justifyContent:"center",gridColumnStart:1,gridColumnEnd:2,gridRowStart:index + 2,gridRowEnd:index + 3}}>{hour}</div>
                        )
                    })}
                </div>
                <div style={{gridColumnStart:"2",gridColumnEnd:"3",gridRowStart:"2",gridRowEnd:"3"}}>
                    <DepCalendar events={events} {...defaultProps}/>
                </div>
                </div>
                </div>
            </WeekContext.Provider>
        </>
    );
}
export default DepSchedule;