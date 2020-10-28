import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer,Views } from 'react-big-calendar' 
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSelector } from 'react-redux';
import '../styles/DepartmentScheduler.css'

const now = new Date()
const es = [
    {
       id: 15,
       title: 'Point in Time Event',
       start: now,
       end: now,
    }
]
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const DndCalendar = withDragAndDrop(Calendar)
const DepartmentScheduler = props => {
    const encounters = useSelector(state=>state.encounters.my_encounters)
    const appointmentOrders = useSelector(state=>state.orders.appointment_requests)
    // const orders = Object.values(appointmentOrders).map((order,index)=>{
    // })
    const encs = Object.values(encounters).map((encounter,index)=>{
      const eventEnd = encounter.end + "-400"
      const eventStart = encounter.start + "-400"
      return {
        id: encounter.id,
        title: encounter.patient.fullName,
        end: new Date(eventEnd),
        start: new Date(eventStart),
      }
    })

    const [events,setEvents] = useState(encs)
    const [loading,setLoading] = useState(true)
    const [orders,setOrders] = useState(appointmentOrders)
    const [displayDragItemInCell,setDisplayDragItemInCell] =useState(true)
    const [draggedEvent,setDraggedEvent] = useState({})
    // const [dragFromOutsideItem,setDragFromOutsideItem] = useState(null)
    useEffect(()=>{
      if (orders && events.length) {
        setLoading(false)
      }
    },[encounters,appointmentOrders])

    const dragFromOutsideItem = () => {
        return draggedEvent
    }

    const handleDragStart = (event) => {
        setDraggedEvent(event)
    }

    const resizeEvent = ({ event, start, end }) => {
    
        const nextEvents = events.map(existingEvent => {
          return existingEvent.id == event.id
            ? { ...existingEvent, start, end }
            : existingEvent
        })
    
        setEvents(nextEvents)
        //alert(`${event.title} was resized to ${start}-${end}`)
      }

    const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        // const { events } = this.state
    
        // let allDay = event.allDay
    
        // if (!event.allDay && droppedOnAllDaySlot) {
        //   allDay = true
        // } else if (event.allDay && !droppedOnAllDaySlot) {
        //   allDay = false
        // }
    
        const nextEvents = events.map(existingEvent => {
          return existingEvent.id == event.id
            ? { ...existingEvent, start, end }
            : existingEvent
        })
    
        setEvents(nextEvents)
    
        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
      }


      const onDropFromOutside = ({ start, end, allDay }) => {
        const event = {
          id: draggedEvent.id,
          title: draggedEvent.title,
          start,
          end,
          allDay: allDay,
        }
        console.log(draggedEvent)

        removeOrderFromList(draggedEvent.order.id)
        setDraggedEvent(null)
        newEvent(event)
      }

      const removeOrderFromList = (order) => {
        console.log(orders)
        const prevOrders = {...orders}
        delete prevOrders[order]
        console.log(prevOrders)
        setOrders(prevOrders)
      }

      const newEvent = event => {
        let idList = events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
          id: newId,
          title: event.title,
          allDay: event.isAllDay,
          start: event.start,
          end: event.end,
        }
        setEvents([...events,hour])
      }
    if (loading) {
      return "...loading"
    }
    
    return (
        <>
        <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
        <div style={{width:"180px",marginRight:"15px",display:"flex",flexDirection:"column",overflow:"scroll",height:"500px"}}>
        {Object.values(orders).map((order,index)=> {
        return (<div
                className={"draggable"}
                style={{
                  border: '2px solid gray',
                  borderRadius: '4px',
                  width: '100%',
                  height:"30px",
                  padding:"4px",
                }}
                draggable="true"
                onDragStart={() =>
                  handleDragStart({ title: order.patient.fullName, order:order })
                }
              >
                {order.patient.fullName}
              </div>)})}
        </div>
            <div style={{width:"100%"}}>
                <DndCalendar
                    style={{ height: 600 }}
                    localizer={localizer}
                    startAccessor="start"
                    selectable
                    popup={true}
                    min={new Date(1970, 1, 1, 8)}
                    max={new Date(1970, 1, 1, 17)}
                    scrollToTime={new Date(1970, 1, 1, 3)}
                    onEventDrop={moveEvent}
                    endAccessor="end"
                    onEventResize={resizeEvent}
                    defaultView={Views.WEEK}
                    dragFromOutsideItem = {dragFromOutsideItem}
                    onDropFromOutside={onDropFromOutside}
                    defaultDate={moment().toDate()}
                    // displayDragItemInCell={true}
                    handleDragStart={handleDragStart}
                    events={events}/>

            </div>
        </div>
        </>
        )
}

export default DepartmentScheduler