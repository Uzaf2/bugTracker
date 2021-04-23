
import React, {useCallback, useState} from 'react';
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

    console.log("Passing over things !!!!!", counterValue);
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
    //console.log("Data :",data1.getUsers);
    
    
    for (var i=0;i<length2;i++ )
    {
      users.push(data1.getUsers[i]);
    }
    
   

    //console.log("Tickets", tickets);
    //console.log("Users", users);

    for (var i=0;i<tickets.length; i++)
    {
      for (var j=0;j<tickets[i].assignedDeveloper.length;j++)
      {
        developersArray.push(tickets[i].assignedDeveloper[j]);
      }
    }
    
    //console.log("Developer array", developersArray);

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

    //console.log("Developers Name", developerNameArray);

    var finalArray = [];
    
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = developerNameArray.filter(onlyUnique);
    
    //console.log("Unique array: ",unique);
    //console.log("Arrays:",);

    for(var i=0;i<unique.length;i++)
    {
      finalArray.push({name:unique[i],count:0});
    }

    //console.log("Final Array", finalArray);

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

  //console.log("Final Array", finalArray);

  var inputArray= [];

 inputArray.push(['Language', 'Speakers (in millions)']);
  for (var i=0;i<finalArray.length;i++)
  {
    inputArray.push([''+finalArray[i].name+'', finalArray[i].count]);
  }
  console.log("InputArray", inputArray);
  
   }

  //console.log("data10", data10);
  return (
    <body>
 <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={inputArray}
  options={{
    title: 'Number of Tickets Assigned to each Developer'
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