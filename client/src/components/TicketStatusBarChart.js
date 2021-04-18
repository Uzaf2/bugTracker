
import React, {useCallback, useState} from 'react';

import Chart from "react-google-charts";
import { useQuery, gql } from '@apollo/client';

var counterValue = 0;

function TicketStatusBarChart(props) {

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
    ['High', high, '#b87333', null],
    ['Medium',  medium, 'silver', null],
    ['Low', low, 'gold', null],
  ]}
  options={{
    title: 'Number of Tickets by Status',
    width: 500,
    height: 300,
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
  }}
  // For tests
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