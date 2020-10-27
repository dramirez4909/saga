
import React, { useContext, useEffect, useState, useRef } from "react";
import '../styles/schedule.css'
import _ from "lodash";
import RGL, { Responsive, WidthProvider } from "react-grid-layout";
import WeekContext from "./utils/WeekContext";
import {openPatientChart} from '../store/activities'
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from './utils/HomeContext';
import Divider from '@material-ui/core/Divider';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import {createNewEncounter} from '../store/encounters'


const ResponsiveReactGridLayout = WidthProvider(RGL)

// const cardStyle = {
//   '&:hover': {
//       backgroundColor: "hsla(0,0%,100%,.32)",
//   }
// }

const DragFromOutsideLayout=(props)=> {
  const dispatch = useDispatch()
  const context = useContext(WeekContext)
  const homeContext = useContext(HomeContext)

  const [mounted,setMounted] = useState(false)
  const [layouts,setLayouts] = useState(props.events)
  const openTabs = useSelector(state=>state.activities.open_tabs)

  useEffect(()=>{
    setMounted(false)
  },[])

  const openChart=(patient)=>{
    if (!openTabs.some(activity=>activity.name === `${patient.lastName}, ${patient.firstName}`)) dispatch(openPatientChart(patient.id))
    homeContext.setSelectedTab(`${patient.lastName}, ${patient.firstName}`,patient)
  }

  const [hoverEncounter,setHoverEncounter] = useState({})
  console.log(hoverEncounter)

  const generateDOM=()=>{
    return props.events.map((l, i)=>{
      let startHour = (parseInt(((l.y - 2) / 4)) + 8) % 12
      let endHour = (parseInt(((l.y + l.h - 2) / 4)) + 8) % 12
      let startMin = (l.y - 2) % 4 * 15
      let endMin = ((l.y + l.h) - 2) % 4 * 15

      if (startHour === 0){
        startHour = 12
      }
      if (endHour === 0){
        endHour = 12
      }
      if (startMin === 0){
        startMin = "00"
      }
      if (endMin === 0){
        endMin = "00"
      }
      if (l.static) {
        return (
          <div key={i} className={"static"} style={{backgroundColor:"#f9f9f9"}}>
            <span
              className="text"
              title="Time is unschedulable"
            >
            </span>
          </div>
        )
      }
      return (
            <div key={i} className={"schedule-card-blue"} onMouseLeave={()=>{setHoverEncounter({})}} onMouseEnter={()=>{setHoverEncounter(l.encounter)}} style={{borderRadius:"5px",cursor:"pointer",display:"flex",flexDirection:"column"}}>
              <div style={{justifyContent:"space-between", display:"flex",flexDirection:"row",padding:"5px",alignItems:"center",marginBottom:"0px",alignContent:"center"}}>
                {/* <img style={{alignSelf:"normal",marginRight:"2px"}} className="patient-photo-schedule" src={l.encounter.patient ? l.encounter.patient.picture : ""}/> */}
                <div style={{marginTop:"-6px",marginLeft:"6px"}}>
                  <strong style={{fontSize:"13px"}}>{l.patient.fullName}</strong>
                {/* <strong style={{fontSize:"11px",display:"block",borderRadius:"4px",background:"white",color:"grey",width:"fit-content",padding:"2px",border:"1px solid grey"}}>EXAM ROOM B</strong> */}
                </div>
                <div style={{fontSize:"12px",fontWeight:"strong"}}>
                  <strong>{`${startHour}:${startMin} - ${endHour}:${endMin}`}</strong>
                </div>
                </div>
                <div style={{display: hoverEncounter.id === l.encounter.id ? "flex" : "flex",borderRadius:"5px",display:"flex",flexDirection:"column",marginRight:"140px",marginLeft:"-50px",background:"white",padding: hoverEncounter.id === l.encounter.id ? "6px" : "",boxShadow:"rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}>
                  <div style={{display:hoverEncounter.id === l.encounter.id ? "flex" : "none",flexDirection:"column"}}>
                    <div onClick={()=>openChart(l.encounter.patient)} style={{display: hoverEncounter.id === l.encounter.id ? "flex" : "none",flexDirection:"row",justifyContent:"center",color:"white", borderRadius:"3px",padding:"3px",height:"min-content",width:"100%",cursor:"pointer",background:"lightgreen"}}> open chart <ExitToAppTwoToneIcon style={{marginLeft:"3px"}}/> </div>
                    <div onClick={()=>openChart(l.encounter.patient)} style={{marginTop:"2px", display: hoverEncounter.id === l.encounter.id ? "flex" : "none", flexDirection:"row",justifyContent:"center",color:"white", borderRadius:"3px",padding:"3px",height:"min-content",width:"100%",cursor:"pointer",background:"lightgreen"}}>open encounter</div>
                  </div>
                  <div style={{position:"relative",display:hoverEncounter.id === l.encounter.id ? "" : "none",opacity:"100%",width:"160px",height:"160px",overflow:"hidden",borderRadius:"50%",border:"2px solid #fff"}}>
                    <img src={`${hoverEncounter.patient ? hoverEncounter.patient.picture : ""}`} style={{display:hoverEncounter.id === l.encounter.id ? "flex" : "none"}} className={"user-photo"}/>
                  </div>
                </div>
            </div>
          )
        }
      )
    }


  const onDrop = (layout, l, event) => {
    console.log(event)
      console.log("layoutItem",l)
      let startHour = (parseInt(((l.y - 2) / 4)) + 8)
      let endHour = (parseInt(((l.y + l.h - 2) / 4)) + 8)
      let startMin = (l.y - 2) % 4 * 15
      let endMin = ((l.y + l.h) - 2) % 4 * 15

      if (startHour === 0){
        startHour = 12
      }
      if (endHour === 0){
        endHour = 12
      }
      if (startMin === 0){
        startMin = "00"
      }
      if (endMin === 0){
        endMin = "00"
      }
      let dayIndex = l.x
      let dayAndMonth = props.weekDays[dayIndex].split("/")
      let day = Number(dayAndMonth[1])
      let month = Number(dayAndMonth[0]) - 1
      startHour = Number(startHour)
      startMin = Number(startMin)
      const encounterStart = new Date(2020, month, day,startHour,startMin)
      console.log(encounterStart)
      const encounterEnd = new Date(2020,month,day,startHour + 1,startMin)
      context.setLoading(true)
      context.setEncounterToCreate({encounter_type_id:1,patient_id:3,start:encounterStart,end:encounterEnd,date:encounterStart})
    // alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
  };

    return (
      <div>
          
        {/* <div>
          Current Breakpoint: {this.state.currentBreakpoint} (
          {this.props.cols[this.state.currentBreakpoint]} columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button> */}
        <div
          className="droppable-element"
          draggable={true}
          id={"jimmy boy"}
          unselectable="on"
          onDragStart={e => e.dataTransfer.setData("text/plain", "")}
          style={{color:"black"}}
        >
          Droppable Element (Drag me!)
        </div>
        <ResponsiveReactGridLayout
          {...props}
          layout={layouts}
          // onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={context.updateLayout}
          onDrop={onDrop}
          // WidthProvider option
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType={"No Compaction"}
          preventCollision={true}
          isDroppable={true}
          className={"grid"}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
}

export default DragFromOutsideLayout;