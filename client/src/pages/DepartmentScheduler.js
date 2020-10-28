import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer,Views } from 'react-big-calendar' 
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import '../styles/DepartmentScheduler.css'
import { createNewEncounter } from '../store/encounters';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import OrderList from '../components/OrderList'
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const ColorButton = withStyles((theme) => ({
  root: {
      color: "white",
      paddingRight: "10px",
      paddingLeft: "10px",
      margin: "4px",
      backgroundColor:"grey",
      '&:hover': {
          backgroundColor: "#b1f3b1 !important",
      },
  },
  }))(Button);


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const dispatch = useDispatch()
    const encounters = useSelector(state=>state.encounters.my_encounters)
    const appointmentOrders = useSelector(state=>state.orders.appointment_requests)
    // const orders = Object.values(appointmentOrders).map((order,index)=>{
    // })

    const [events,setEvents] = useState([])
    const [loading,setLoading] = useState(true)
    const [orders,setOrders] = useState({})
    const [displayDragItemInCell,setDisplayDragItemInCell] =useState(true)
    const [draggedEvent,setDraggedEvent] = useState({})
    const [calendarLoading,setCalendarLoading] = useState(true)
    const [departmentIndex, setDepartmentIndex] = React.useState();
    const [departments,setDepartments] = useState({})

    const handleChange = (event) => {
      console.log(event.target.value)
      setDepartmentIndex(event.target.value);
    };
    // const [dragFromOutsideItem,setDragFromOutsideItem] = useState(null)
    // useEffect(()=>{
    //   if (encounters || appointmentOrders) {
    //     setLoading(false)
    //   }
    // },[encounters,appointmentOrders])

    useEffect(()=>{
      const getDepartments = async () => {
        const response = await fetch('/api/departments/')
        const data = await response.json()
        setDepartments(data.departments)
        setLoading(false)
        console.log(data)
      }
      getDepartments()
    },[])

    const selectDepartment = (e) => {
      e.preventDefault()
      handleClose()
      const dept = departments[departmentIndex]
      const encs = Object.values(dept.encounters).map((encounter,index)=>{
        const eventEnd = encounter.end + "-400"
        const eventStart = encounter.start + "-400"
        return {
          id: encounter.id,
          title: encounter.patient.fullName,
          end: new Date(eventEnd),
          start: new Date(eventStart),
        }
      })
      const ordObj = {}
      dept.orders.forEach(order=>{
        ordObj[order.id] = order
      })
      setOrders(ordObj)
      console.log("orders: ",dept.orders)
      setEvents(encs)
      console.log("EVENTS",encs)
      setCalendarLoading(false)
    }

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
        console.log("EVENT TO CREATE",event)
        dispatch(createNewEncounter({...event,order:draggedEvent.order}))
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
        <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={open}>
          <div className={classes.paper}>
            <h3>Select a department to continue</h3>
            <form onSubmit={selectDepartment}>
            <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Department</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={departmentIndex}
          onChange={handleChange}
          input={<BootstrapInput />}
        > 
        <option aria-label="None" value="" />
        {
          departments.map((dept,index)=>{
            return <option value={index}>{dept.name}</option>
          })
        }
          </NativeSelect>
          </FormControl>
          <ColorButton type="submit">Let's go!</ColorButton>
          </form>
          </div>
        </Slide>
      </Modal>
    </div>
        </>
        )
}

export default DepartmentScheduler