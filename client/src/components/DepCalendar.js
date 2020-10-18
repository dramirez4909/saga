import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
const Calendar =(props)=> {
    return (
      <div style={{margin:"10px"}}>
      <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            weekends={false}
            slotMinTime={"08:00:00"}
            slotMaxTime={"18:00:00"}
            // datesSet={this.handleDates}
            // select={this.handleDateSelect}
            // events={this.props.events}
            // eventContent={renderEventContent} // custom render function
            // eventClick={this.handleEventClick}
            // eventAdd={this.handleEventAdd}
            // eventChange={this.handleEventChange} // called for drag-n-drop/resize
            // eventRemove={this.handleEventRemove}
          />
        </div>
    )
}

export default Calendar;