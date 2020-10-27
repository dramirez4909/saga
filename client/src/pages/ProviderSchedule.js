import React, { useState } from 'react'
import { Calendar, momentLocalizer,Views } from 'react-big-calendar' 
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'

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
const ProviderSchedule = props => {
    const [events,setEvents] = useState(es)
    const [displayDragItemInCell,setDisplayDragItemInCell] =useState(true)
    const [draggedEvent,setDraggedEvent] = useState({})
    // const [dragFromOutsideItem,setDragFromOutsideItem] = useState(null)

    const dragFromOutsideItem = () => {
        return draggedEvent
    }
    
    const onEventDrop = (data) => {
        console.log(data);
      };

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


      const onDropFromOutside = ({ start, end, allDay, eventId }) => {
        const event = {
          id: draggedEvent.id,
          title: draggedEvent.title,
          start,
          end,
          allDay: allDay,
        }
        console.log(draggedEvent)
    
        setDraggedEvent(null)
        newEvent(event)
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
    
    return (
        <>
        <div style={{display:"flex",flexDirection:"row"}}>
        <div
                style={{
                  border: '2px solid gray',
                  borderRadius: '4px',
                  width: '100px',
                  margin: '10px',
                }}
                draggable="true"
                onDragStart={() =>
                  handleDragStart({ title: "funny" })
                }
              >
                {"Funny paper"}
        </div>
            <div>
                <DndCalendar
                    style={{ height: 500 }}
                    localizer={localizer}
                    startAccessor="start"
                    selectable
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

export default ProviderSchedule