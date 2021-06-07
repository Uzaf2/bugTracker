
import React from 'react';
import Chart from "react-google-charts";
import { gql, useMutation, useQuery } from '@apollo/client';
import Spinner from 'react-spinner-material';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  spinner: {
    marginLeft: '45%',
    marginTop: '25%'
  }
});


function TicketStatusBarChart(props) {
    const classes = useStyles();
    var counterValue = 0;
    var completed = 0;
    var open = 0;
    var inProgress = 0; 
    const { loading, data } = useQuery(GET_TICKETS);

    
    if (loading)
    return (<div className={classes.spinner}>
      <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
      </div>); 

    else {

        if (counterValue ===0)
        {
        const length = data.getTickets.length;

        for (var i =0;i<length;i++)
        {

        var value = data.getTickets[i].status;


        if (value === "completed")
        {
            completed = completed +1;
        }
        else if (value === "open")
        {
            open = open + 1;
        }
        else if (value === "in progress")
        {
            inProgress = inProgress + 1;
        }
        }

        counterValue = counterValue + 1;
        }
        
    }

  return (
    <body>
      <div style={{ display: 'flex', maxWidth: 900 }}>
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={[
    [
      'Element',
      'Density',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ],
    ['Completed', completed, '#b87333', null],
    ['Open',  open, 'silver', null],
    ['In Progress', inProgress, 'gold', null],
  ]}
  options={{
    width: 500,
    height: 300,
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
    backgroundColor: "#EEEEEE"
  }}

  rootProps={{ 'data-testid': '6' }}
/>
</div>
    </body>
  );
}



const GET_TICKETS = gql`
{
getTickets{
    title
    description 
    assignedProject
    assignedDeveloper
    priority
    status
    type
    createdAt
    updatedAt
}  
}`;

export default TicketStatusBarChart;