import React from 'react';
import Chart from "react-google-charts";
import { useQuery, gql } from '@apollo/client';


function TicketPriorityBarChart(props) {
var counterValue = 0;
    var high = 0;
    var medium = 0;
    var low = 0; 
    var rows = [];
    const { loading, data } = useQuery(GET_TICKETS);

    
    if (loading)
      return <p>Loading...</p>;

    else {

        if (counterValue ===0)
        {
        const length = data.getTickets.length;

        for (var i =0;i<length;i++)
        {

              var value = data.getTickets[i].priority;


        if (value === "High")
        {
            high = high +1;
        }
        else if (value === "Low")
        {
            low = low + 1;
        }
        else if (value === "Medium")
        {
            medium = medium + 1;
        }
        }

        counterValue = counterValue + 1;
        }
        
    }

  return (
    <body>
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
    ['High', high, '#b87333', null],
    ['Medium',  medium, 'silver', null],
    ['Low', low, 'gold', null],
  ]}
  options={{
    width: 500,
    height: 300,
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
    backgroundColor: "#EEEEEE"
  }}
  // For tests
  rootProps={{ 'data-testid': '6' }}
/>

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

export default TicketPriorityBarChart;