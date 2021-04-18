
import React, {useCallback, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import Chart from "react-google-charts";

var counterValue = 0;

function TicketTypePieChart(props) {

    var featureRequests = 0;
    var otherComments = 0;
    var BugsErrors = 0; 
    var trainingDocuments = 0;
    console.log("Passing over things !!!!!", counterValue);
    const { loading, data } = useQuery(GET_TICKETS);

 if (loading)
      return <p>Loading...</p>;

    else {
    
    console.log("data",data);
        
        if (counterValue ===0)
        {
        const length = data.getTickets.length;
    
     
        for (var i =0;i<length;i++)
        {
            
          var value = data.getTickets[i].type;
          console.log("Value", value);
        if (value === "Feature Requests")
        {
            featureRequests = featureRequests +1;
        }
        else if (value === "Other Comments")
        {
            otherComments = otherComments + 1;
        }
        else if (value === "Bugs/Error")
        {
            BugsErrors = BugsErrors + 1;
        }
        else if (value === "Training/Document Requests")
        {
            trainingDocuments = trainingDocuments + 1;
        }
      
       }
      
        counterValue = counterValue + 1;
        }
        
      console.log("Values",featureRequests, otherComments, BugsErrors, trainingDocuments)
    }
  
  return (
    <body>
      <div style={{ display: 'flex', maxWidth: 900 }}>
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Feature Requests', featureRequests],
    ['Other Comments', otherComments],
    ['Bugs/Error', BugsErrors],
    ['Training/Document Requests', trainingDocuments],
  ]}
  options={{
    title: 'Tickets By Type',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
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

export default TicketTypePieChart;