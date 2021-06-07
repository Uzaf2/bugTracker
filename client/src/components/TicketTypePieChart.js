
import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Chart from "react-google-charts";
import Spinner from 'react-spinner-material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spinner: {
    marginLeft: '45%',
    marginTop: '25%'
  }
});

function TicketTypePieChart(props) {
    const classes = useStyles();
    var counterValue = 0;
    var featureRequests = 0;
    var otherComments = 0;
    var BugsErrors = 0; 
    var trainingDocuments = 0;
    const { loading, data } = useQuery(GET_TICKETS);
    var inputArray= [];

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
          var value = data.getTickets[i].type;

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