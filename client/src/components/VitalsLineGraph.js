import React from "react";
import Chart from "react-google-charts";


const VitalsLineGraph = (props) => {
  if (!props.data.length) {
    return (
      <div>
        {`No available ${props.title} readings`}
      </div>
    )
  }
  return (
    <Chart
    width={'220px'}
    height={'220px'}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      [
        { type: 'date', label: 'Day' },
        props.title,
      ],
      ...props.data
    ]}
    options={{
      hAxis: {
        title: 'Date Taken',
      },
      vAxis: {
        title: 'Reading',
      },
      legend: 'none',
      curveType: 'function',
      animation:{
        duration: 1000,
        easing: 'out',
        startup: true,
        pointShape: { type:"circle"},
        pointSize: 30,
        
      },
      backgroundColor:"transparent",
      theme:"maximized",
      color: '#e7711b',
      lineWidth:2,

      // chartArea:{left:10,top:20,width:"100%",height:"100%"}
      // chartArea:{width:"",height:"80%"}
    }}
    rootProps={{ 'data-testid': '1' }}
  />
  )
}

export default VitalsLineGraph;