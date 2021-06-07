import React from "react";
import { render } from "react-dom";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from '@nivo/pie'
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data = [
    {
      "id": "css",
      "label": "css",
      "value": 168,
      "color": "hsl(165, 70%, 50%)"
    },
    {
      "id": "elixir",
      "label": "elixir",
      "value": 502,
      "color": "hsl(87, 70%, 50%)"
    },
    {
      "id": "erlang",
      "label": "erlang",
      "value": 245,
      "color": "hsl(23, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 477,
      "color": "hsl(8, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 567,
      "color": "hsl(147, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 422,
      "color": "hsl(52, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 139,
      "color": "hsl(187, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 346,
      "color": "hsl(170, 70%, 50%)"
    },
    {
      "id": "scala",
      "label": "scala",
      "value": 571,
      "color": "hsl(312, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 72,
      "color": "hsl(137, 70%, 50%)"
    },
    {
      "id": "java",
      "label": "java",
      "value": 174,
      "color": "hsl(135, 70%, 50%)"
    },
    {
      "id": "stylus",
      "label": "stylus",
      "value": 308,
      "color": "hsl(340, 70%, 50%)"
    },
    {
      "id": "c",
      "label": "c",
      "value": 83,
      "color": "hsl(332, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 195,
      "color": "hsl(278, 70%, 50%)"
    },
    {
      "id": "php",
      "label": "php",
      "value": 114,
      "color": "hsl(221, 70%, 50%)"
    },
    {
      "id": "make",
      "label": "make",
      "value": 302,
      "color": "hsl(206, 70%, 50%)"
    },
    {
      "id": "rust",
      "label": "rust",
      "value": 194,
      "color": "hsl(34, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 557,
      "color": "hsl(193, 70%, 50%)"
    }
  ];
  

const PieChart = () => (
  <div style={styles}>

    <div style={{ height: "400px", width:"400px" }}>
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>
  </div>
);

export default PieChart;