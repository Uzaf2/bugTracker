
import React, {useCallback, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import Chart from "react-google-charts";

function TicketTypePieChart(props) {
var counterValue = 0;
    var featureRequests = 0;
    var otherComments = 0;
    var BugsErrors = 0; 
    var trainingDocuments = 0;
    console.log("Passing over things !!!!!", counterValue);
    const { loading, data } = useQuery(GET_TICKETS);
    var inputArray= [];



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
    

    inputArray.push(['Task', 'Hours per Day']);
    inputArray.push(['Feature Requests', featureRequests]);
    inputArray.push(['Other Comments', otherComments]);
    inputArray.push(['Bugs/Error', BugsErrors]);
    inputArray.push(['Training/Document Requests', trainingDocuments]);

   
    }
  
  return (
    <body>
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={inputArray}
  options={{
    title: 'Tickets By Type',
    backgroundColor: "#EEEEEE"
    // Just add this option
  }}
  rootProps={{ 'data-testid': '2' }}
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

export default TicketTypePieChart;