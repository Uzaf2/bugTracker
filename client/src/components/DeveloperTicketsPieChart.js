
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Chart from "react-google-charts";

var counterValue = 0;

function DeveloperTicketsPieChart(props) {

    var featureRequests = 0;
    var otherComments = 0;
    var BugsErrors = 0; 
    var trainingDocuments = 0;
    var users = [];
    var tickets = [];
    var developersArray = [];
    var developerNameArray = [];

    const { loading, data } = useQuery(GET_TICKETS);
    const { loading:loading1, data:data1 } = useQuery(GET_USERS);

if (loading)
      return <p>Loading...</p>;

    else {
    
    var length1 = data.getTickets.length;
    
    for (var i=0;i< length1; i++)
    {
      tickets.push(data.getTickets[i]);
    }
    
    }

if (loading1)
      return <p>Loading...</p>;

    else {

    var length2 = data1.getUsers.length;

    for (var i=0;i<length2;i++ )
    {
      users.push(data1.getUsers[i]);
    }

    for (var i=0;i<tickets.length; i++)
    {
      for (var j=0;j<tickets[i].assignedDeveloper.length;j++)
      {
        developersArray.push(tickets[i].assignedDeveloper[j]);
      }
    }


    for (var i=0;i<users.length;i++)
    {
      var id = users[i].id;
      for (var j=0;j<developersArray.length; j++)
      {
        if (id=== developersArray[j])
      {
        developerNameArray.push(users[i].username)
      }
      }
    }

    var finalArray = [];
    
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = developerNameArray.filter(onlyUnique);
    
    for(var i=0;i<unique.length;i++)
    {
      finalArray.push({name:unique[i],count:0});
    }


    var countArray = [];
    for (var i=0;i<unique.length;i++)
    {
      for (var j=0;j<developerNameArray.length;j++)
      {
          if(developerNameArray[i]===developerNameArray[j])
          {
              finalArray[i].count = finalArray[i].count + 1;
          }
      }
    }

  var inputArray= [];

 inputArray.push(['Language', 'Speakers (in millions)']);
  for (var i=0;i<finalArray.length;i++)
  {
    inputArray.push([''+finalArray[i].name+'', finalArray[i].count]);
  }  
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
  }}
  rootProps={{ 'data-testid': '2' }}
/>
    </body>
  );
}


const GET_USERS = gql`
{
getUsers{
    id
    username
    email
    creationTime
    role
    access
}  
}`;
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

export default DeveloperTicketsPieChart;