
import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Chart from "react-google-charts";
import Spinner from 'react-spinner-material';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsivePie } from '@nivo/pie';

const useStyles = makeStyles({
  spinner: {
    marginLeft: '45%',
    marginTop: '25%'
  }
});
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

  
function TicketTypeNewPieChart(props) {
    const classes = useStyles();
    var counterValue = 0;
    var featureRequests = 0;
    var otherComments = 0;
    var BugsErrors = 0; 
    var trainingDocuments = 0;
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

export default TicketTypeNewPieChart;