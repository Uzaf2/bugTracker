
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import Chart from "react-google-charts";
import Spinner from 'react-spinner-material';

const useStyles = makeStyles({
  spinner: {
    marginLeft: '45%',
    marginTop: '25%'
  }
});
function DeveloperTicketsPieChart(props) {

  const classes = useStyles();
    var users = [];
    var tickets = [];
    var developersArray = [];
    var developerNameArray = [];

    const { loading, data } = useQuery(GET_TICKETS);
    const { loading:loading1, data:data1 } = useQuery(GET_USERS);

if (loading)
return (<div className={classes.spinner}>
  <Spinner  radius={60} color={"#4B0082"} stroke={5} visible={true} />
  </div>);     
//return <p>Loading...</p>;

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

   const dataExample = [
    {
      id: "FeatureRequests",
      label: "FeatureRequests",
      value: featureRequests,
      color: "hsl(297, 70%, 50%)"
    },
    {
      id: "OtherComments",
      label: "OtherComments",
      value: otherComments,
      color: "hsl(65, 70%, 50%)"
    },
    {
      id: "BugsErrors",
      label: "BugsErrors",
      value: BugsErrors,
      color: "hsl(135, 70%, 50%)"
    },
    {
      id: "TrainingDocuments",
      label: "TrainingDocuments",
      value: trainingDocuments,
      color: "hsl(43, 70%, 50%)"
    }
  ];

  return (
   <body>
         <div style={styles}>
        <div style={{ height: "300px", width:"500px" }}>
        <ResponsivePie
    data={dataExample}
    margin={{
      top: 40,
      right: 80,
      bottom: 80,
      left: 80
    }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{
      scheme: "nivo"
    }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]]
    }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{
      from: "color"
    }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: "FeatureRequests"
        },
        id: "dots"
      },
      {
        match: {
          id: "OtherComments"
        },
        id: "lines"
      },
      {
        match: {
          id: "BugsErrors"
        },
        id: "lines"
      },
      {
        match: {
          id: "TrainingDocuments"
        },
        id: "dots"
      }
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000"
            }
          }
        ]
      }
    ]}
  />
    </div>
    </div>
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