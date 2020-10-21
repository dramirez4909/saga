
import React, { useContext, useEffect, useState } from "react";
import '../styles/schedule.css'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import WeekContext from "./utils/WeekContext";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


const DragFromOutsideLayout=(props)=> {
  const context = useContext(WeekContext)

  const [mounted,setMounted] = useState(false)
  const [layouts,setLayouts] = useState({lg:props.events})

  useEffect(()=>{
    setMounted(true)
  },[])

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
          <div key={i} className={"static"}>
            <span
              className="text"
              title="Time is unschedulable"
            >
            </span>
          </div>
        )
      }
      return (
            <div key={i}>
              <div style={{justifyContent:"space-between", display:"flex",flexDirection:"row",padding:"5px",cursor:"pointer"}}>
                <div>
                  {l.patient.fullName}
                </div>
                <div>
                  {`${startHour}:${startMin} - ${endHour}:${endMin}`}
                </div>
                </div>
            </div>
          )
        }
      )
    }


  const onDrop = (layout, layoutItem, event) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
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
        </button>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          onDragStart={e => e.dataTransfer.setData("text/plain", "")}
        >
          Droppable Element (Drag me!)
        </div> */}
        <ResponsiveReactGridLayout
          {...props}
          layouts={layouts}
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