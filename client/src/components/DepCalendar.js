
import React, { useEffect, useState } from "react";
import '../styles/schedule.css'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


const DragFromOutsideLayout=(props)=> {
  

  const [currentBreakpoint,setCurrentBreakPoint] = useState("lg")
  const [mounted,setMounted] = useState(false)
  const [layouts,setLayouts] = useState({lg:props.events})

  useEffect(()=>{
    setMounted(true)
  },[])

  const generateDOM=()=>{
    return props.events.map((l, i)=>{
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
            <div key={i} onClick={()=>{console.log(l.encounter)}} onDragStart={()=>{console.log("lalal")}}>
              <div style={{justifyContent:"space-between", display:"flex",flexDirection:"row",padding:"5px",cursor:"pointer"}}>
                <div>
                  {l.patient.fullName}
                </div>
                <div>
                  {l.start} - {l.end}
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
          onLayoutChange={(e)=>{console.log(e)}}
          onDrop={onDrop}
          // WidthProvider option
          measureBeforeMount={false}
          onDragEnd={(e)=>{console.log(e)}}
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

function generateLayout() {
  return []
  // return _.map(_.range(0, 25), function(item, i) {
  //   var y = Math.ceil(Math.random() * 4) + 1;
  //   return {
  //     x: Math.round(Math.random() * 5) * 2,
  //     y: Math.floor(i / 6) * y,
  //     w: 2,
  //     h: y,
  //     i: i.toString(),
  //     static: true
  //   };
  // });
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn => fn.default(DragFromOutsideLayout));
// }


// import React from "react";
// import _ from "lodash";
// import RGL, { WidthProvider } from "react-grid-layout";

// const ReactGridLayout = WidthProvider(RGL);

// class NoCollisionLayout extends React.PureComponent {
//   static defaultProps = {
//     className: "layout",
//     items: 50,
//     cols: 12,
//     rowHeight: 30,
//     onLayoutChange: function() {},
//     // This turns off compaction so you can place items wherever.
//     verticalCompact: false,
//     // This turns off rearrangement so items will not be pushed arround.
//     preventCollision: true
//   };

//   constructor(props) {
//     super(props);

//     const layout = this.generateLayout();
//     this.state = { layout };
//   }

//   generateDOM() {
//     return _.map(_.range(this.props.items), function(i) {
//       return (
//         <div key={i}>
//           <span className="text">{i}</span>
//         </div>
//       );
//     });
//   }

//   generateLayout() {
//     const p = this.props;
//     return _.map(new Array(p.items), function(item, i) {
//       const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
//       return {
//         x: (i * 2) % 12,
//         y: Math.floor(i / 6) * y,
//         w: 2,
//         h: y,
//         i: i.toString()
//       };
//     });
//   }

//   onLayoutChange(layout) {
//     this.props.onLayoutChange(layout);
//   }

//   render() {
//     return (
//       <ReactGridLayout
//         layout={this.state.layout}
//         onLayoutChange={this.onLayoutChange}
//         {...this.props}
//       >
//         {this.generateDOM()}
//       </ReactGridLayout>
//     );
//   }
// }

// // if (process.env.STATIC_EXAMPLES === true) {
// //   import("../test-hook.jsx").then(fn => fn.default(NoCollisionLayout));
// // }
export default DragFromOutsideLayout;