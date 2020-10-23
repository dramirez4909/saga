import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import ProviderCalendar from '../components/ProviderCalendar'
import WeekContext from '../components/utils/WeekContext'
import '../styles/schedule.css'
import { Transition } from 'react-transition-group';


function DepSchedule(props) {

    const defaultProps = {
        className: "layout",
        rowHeight: 10,
        margin:[1.2,1],
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
    const [currentWeek,setCurrentWeek] = useState(yearAndWeek[1])
    console.log("CURRENT WEEK:",currentWeek)
    const currViewInfo = getDateRangeOfWeek(currentWeek)
    const range = getDates(currViewInfo.dates[0],currViewInfo.dates[1])
    const weekDates = range.map(date=>eval(date.getMonth()+1) +"/" + date.getDate())
    const [weekDays,setWeekDays] = useState(weekDates.slice(1,6))
    const encountersByWeek = useSelector(state=>state.encounters.by_week)
    const [encounters,setEncounters] = useState(encountersByWeek[currentWeek])
    const [loading,setLoading] = useState(false)
    
    const hours = ["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm"]

    
    console.log("encounters",encounters)


    // const createEncountersByWeekObject=(encounters)=>{
    //     const encsByWeek = {}
    //     Object.values(encounters).forEach((encounter,index)=>{
    //         const newEncounterCard = {x:"",y:"",w:1,h:"",i:`${index + 2}`,minW: 1,maxW:1,encounter,patient:encounter.patient,start:"",end:""}
    //         const dateStartArr = encounter.start.split(" ")
    //         console.log(encounter.start)
    //         dateStartArr.pop()
    //         const newStartDateNoTZ = dateStartArr.join(" ")
    //         const encStartTime = new Date(newStartDateNoTZ)
    //         const encounterWeekNumber = getWeekNumber(encStartTime)
    //         console.log(encounterWeekNumber)
    //         const encWeek = encounterWeekNumber[1]
    //         encsByWeek[encWeek] ? encsByWeek[encWeek][encounter.id]=encounter : encsByWeek[encWeek] = {[encounter.id]:encounter}
    //     })
    //     console.log(encsByWeek)
    // }

    // const [encountersByWeek, setEncountersByWeek] = useState(createEncountersByWeekObject(encounters))

    const currentTimeIndicator = () => {
        const currentTimeIndicatorCard = {x:"",y:"",h:1,w:1,static:true}
        const currentTime = new Date()
        const day = currentTime.getDay()
        currentTimeIndicatorCard.x = day - 1
        const hour = currentTime.getHours()
        const minutes = currentTime.getMinutes()
        currentTime.start = `${hour}:${minutes}`
        const hourMark = ((4*(hour - 8)) + 2) + (minutes/15)
        currentTimeIndicatorCard.y = hourMark
        currentTimeIndicatorCard.x = day - 1
        return currentTimeIndicatorCard
    }
    
    const generateLayout=(encounters)=>{
            console.log("THESE ARE ENCOUNTERS!!!",encounters)
            const eventLayout = [{x:0,y:0,i:"0",h:2,w:5,static:true},{x:0,y:44,i:"1",h:2,w:5,static:true}]
            if (!encounters) return eventLayout
            Object.values(encounters).forEach((encounter,index)=>{
            const newEncounterCard = {x:"",y:"",w:1,h:"",i:`${index + 2}`,minW: 1,maxW:1,encounter,patient:encounter.patient,start:"",end:""}
            const dateStartArr = encounter.start.split(" ")
            console.log(encounter.start)
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
        return eventLayout
    }
    const [encountersToDisplay,setEncountersToDisplay] = useState(generateLayout(encounters))
    console.log("DISPPLAY:",encountersToDisplay)
    const [oldLayout,setOldLayout] = useState(encountersToDisplay)
    const [events,setEvents] = useState(encountersToDisplay)

    const updateLayout=(e)=>{
        const difference = oldLayout.filter((el,index)=>el.x !== e[index].x || el.y !== e[index].y || el.h !== e[index].h)
        console.log("OLD LAYOUT",oldLayout)
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

      useEffect(()=>{
        if (encountersByWeek) {
            const currViewInfo = getDateRangeOfWeek(currentWeek - 1)
            const range = getDates(currViewInfo.dates[0],currViewInfo.dates[1])
            const weekDates = range.map(date=>eval(date.getMonth()+1) +"/" + date.getDate())
            setWeekDays(weekDates.slice(1,6))
            setEncounters(encountersByWeek[currentWeek])
            setEncountersToDisplay(generateLayout(encountersByWeek[currentWeek]))
            setEvents(generateLayout(encountersByWeek[currentWeek]))
            setOldLayout(generateLayout(encountersByWeek[currentWeek]))
            setLoading(false)
        }
    },[currentWeek])
    
    return (
        <>
            <WeekContext.Provider value={{updateLayout}}>
            <div className={"provider-schedule"}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"right"}}>
                    <div style={{display:"flex",flexDirection:"row", justifyContent:"right"}}>
                    <button className={"schedule-card"} style={{background: "lightsteelblue", outline:"none", color:"white", border:"none", borderRadius:"3px", margin: "3px"}} onClick={()=>{
                        setLoading(true)
                        setCurrentWeek(currentWeek - 1)
                        }}>Prev. Week</button>
                    <button className={"schedule-card"} style={{background: "lightsteelblue",color:"white",outline:"none", border:"none", borderRadius:"3px", margin: "3px"}} onClick={()=>{
                        setLoading(true)
                        setCurrentWeek(currentWeek + 1)}}>Next Week</button>
                    </div>
            </div>
            {/* <div style={{display:"grid", gridTemplateColumns: "20% 80%", gridTemplateRows: "1.5% 98.5%"}}> */}
                <div style={{gridColumnStart:"2",gridColumnEnd:"3",gridRowStart:"2",gridRowEnd:"3",display:"grid", gridTemplateColumns: "4% 96%", gridTemplateRows: "3.5% 95% 2%", margin:"20px", border:"2px solid #f9f9f9", backgroundColor:"white",borderRadius:"7px",boxShadow: "rgba(0,0,0,0.1) 0 0 5px",gridGap: "1px"}}>
                <div style={{gridColumnStart:"2",gridColumnEnd:"3",gridRowStart:"1",gridRowEnd:"2", display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridTemplateRows: "1fr"}}>
                    {weekDays.map((date,index)=>{
                        return (
                            <div  key={index} style={{display:"flex",alignItems:"center",justifyContent:"center",gridColumnStart:index + 1,gridColumnEnd:`${index+2}`,gridRowStart:"1",gridRowEnd:"2"}}>{date}</div>
                        )
                    })}
                </div>
                <div style={{gridColumnStart:"1",fontSize:"12px",color:"grey",gridColumnEnd:"2",gridRowStart:"2",gridRowEnd:"3", display:"grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr repeat(11,2fr) 1fr",height:"100%"}}>
                    {hours.map((hour,index)=>{
                        return (
                            <div key={index} style={{display:"flex",alignItems:"center",justifyContent:"center",gridColumnStart:1,gridColumnEnd:2,gridRowStart:index + 2,gridRowEnd:index + 3}}>{hour}</div>
                        )
                    })}
                </div>
                <div style={{gridColumnStart:"2",gridColumnEnd:"3",gridRowStart:"2",gridRowEnd:"3"}}>
                    {loading ? <div className={"grid"} style={{display:"flex",flexDirection:"row",width:"100%",height:"599px",alignItems:"center",justifyContent:"center",borderTop:"24px solid #f9f9f9",borderBottom:"24px solid #f9f9f9"}}></div> : <ProviderCalendar events={events} {...defaultProps}/>}
                </div>
                </div>
                {/* </div> */}
                </div>
            </WeekContext.Provider>
        </>
    );
}
export default DepSchedule;