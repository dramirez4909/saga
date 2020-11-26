import React, {useEffect, useState} from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BasicPatientAttributes from './BasicPatientAttributes';
import PatientPhoneNumbers from './PatientPhoneNumbers';
import PatientAddressInfo from './PatientAddressInfo';
import PatientMedications from './PatientMedications';
import ThemeContext from './utils/ThemeContext';
import PatientProblems from './PatientMentalProblems';
import PatientMentalProblemList from './PatientMentalProblemList';
import PatientPhysicalProblemList from './PatientPhysicalProblemList';
import PatientMedicationsList from './PatientMedicationsList';
import PatientEncounters from '../components/PatientEncounters';
import PatientOrders from '../components/PatientOrders';
import { useSelector } from 'react-redux';
import PatientNotes from '../components/PatientNotes';
import { Grid, IconButton } from '@material-ui/core';
import PatientEncountersList from './PatientEncountersList';
import PatientOrdersList from './PatientOrdersList';
import AddIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class ToolBoxItem extends React.Component {
  render() {
    return (
      <div
        className="toolbox__items__item"
        onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
      >
        {this.props.item.i}
      </div>
    );
  }
}
class ToolBox extends React.Component {
  render() {
    return (
      <div className="toolbox">
        <span className="toolbox__title">Toolbox</span>
        <div className="toolbox__items">
          {this.props.items.map(item => (
            <ToolBoxItem
              key={item.i}
              item={item}
              onTakeItem={this.props.onTakeItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

const ChartReviewInfo = (props)=> {
  const defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 },
    initialLayout: generateLayout()
  };

  const [currentBreakpoint,setCurrentBreakpoint] = useState("lg")
  const [compactType,setCompactType] = useState("vertical")
  const [mounted,setMounted] = useState(false)
  const [layouts,setLayouts] = useState({lg:generateLayout()})
  const [toolbox,setToolbox] = useState({lg:[]})

  const state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: generateLayout() },
    toolbox: { lg: [] }
  };

  const componentDidMount = () => {
    setMounted(true)
  }

  useEffect(()=>{
      setMounted(true)
  },[])

  const generateDOM = () => {
    return _.map(layouts[currentBreakpoint], l => {
      return (
        // <div key={l.i} className={l.static ? "static" : ""}>
        //   <div className="hide-button" onClick={onPutItem.bind(this, l)}>
        //     &times;
        //   </div>
        //   {l.static ? (
        //     <span
        //       className="text"
        //       title="This item is static and cannot be removed or resized."
        //     >
        //       Static - {l.i}
        //     </span>
        //   ) : (
        //     <span className="text">{l.i}</span>
        //   )}
          <div key={l.i} style={{display:"flex",flexDirection:"column",borderRadius:"9px",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:"dark" === "dark" ? "#999999" : "white"}}>
                        <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                            <img style={{height:"25px",width:"25px", marginLeft:"5px"}} src="https://saga-health.s3-us-west-1.amazonaws.com/256x256.png"></img>
                            <div style={{color: "dark" === "dark" ? "white" : "rgb(85, 177, 250)", width:"100%", padding:"4px", fontSize:"16px"}}> Physical Health Problems</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row", alignContent:"center",alignItems:"center"}}>
                                <IconButton style={{height:"25px",width:"25px", marginRight:"10px"}}>
                                    <AddIcon style={{height:"25px",width:"25px",color:"lightgreen"}}></AddIcon>
                                </IconButton>
                            </div>
                        </div>
                        <PatientPhysicalProblemList patient={props.patient}/>
                        </div>
        // </div>
      );
    });
  }

  const onBreakpointChange = breakpoint => {
    // this.setState(prevState => ({
    //   currentBreakpoint: breakpoint,
    //   toolbox: {
    //     ...prevState.toolbox,
    //     [breakpoint]:
    //       prevState.toolbox[breakpoint] ||
    //       prevState.toolbox[prevState.currentBreakpoint] ||
    //       []
    //   }
    // }));
    setCurrentBreakpoint(breakpoint)
    setToolbox({...toolbox})
  };

  const onCompactTypeChange = () => {
    const oldCompactType = compactType
    setCompactType( oldCompactType === "horizontal"
    ? "vertical"
    : oldCompactType === "vertical"
    ? null
    : "horizontal")
  };

  const onTakeItem = item => {
    this.setState(prevState => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i)
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item
        ]
      }
    }));
  };

  const onPutItem = item => {
    this.setState(prevState => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item
          ]
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i)
        }
      };
    });
  };

  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
    setLayouts(layouts)
  };

  const onNewLayout = () => {
    this.setState({
      layouts: { lg: generateLayout() }
    });
  };
    return (
      <div>
        <div>
          Current Breakpoint: {currentBreakpoint} (
          {props.cols[currentBreakpoint]} columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(compactType) || "No Compaction"}
        </div>
        <button onClick={onNewLayout}>Generate New Layout</button>
        <button onClick={onCompactTypeChange}>
          Change Compaction Type
        </button>

        <ToolBox
          items={toolbox[currentBreakpoint] || []}
          onTakeItem={onTakeItem}
        />

        <ResponsiveReactGridLayout
          {...props}
          layouts={layouts}
          autoSize={true}
          onBreakpointChange={onBreakpointChange}
          onLayoutChange={onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={mounted}
          compactType={compactType}
          preventCollision={false}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
}

function generateLayout() {
  return _.map(_.range(0, 5), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 1,
      h: y,
      i: i.toString()
    };
  });
}

export default ChartReviewInfo

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn => fn.default(ToolboxLayout));
// }