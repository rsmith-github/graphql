import React from "react";
import { useState } from 'react';
import MediaQuery from "react-responsive";


const Chart = ({ children, height, width }) => {
    return (
        <>
            <MediaQuery minWidth={1271}>
                <svg viewBox={`-50 -20 ${width} ${height + 100}`} height={height} width={width} className="graph2">
                    {children}
                </svg>
            </MediaQuery>

            <MediaQuery minWidth={1029} maxWidth={1270}>
                <svg viewBox={`-100 0 ${width + 100} ${height + 100}`} height={height} width={width - 150} className="graph2">
                    {children}
                </svg>
            </MediaQuery>

            <MediaQuery minWidth={875} maxWidth={1028}>
                <svg viewBox={`-125 0 ${width + 100} ${height + 100}`} height={height} width={width - 250} className="graph2">
                    {children}
                </svg>
            </MediaQuery>


            <MediaQuery minWidth={600} maxWidth={875}>
                <svg viewBox={`60 70 ${width + 50} ${height + 100}`} height={height - 100} width={width + 150} className="graph2">
                    {children}
                </svg>
            </MediaQuery>

            <MediaQuery minWidth={401} maxWidth={599}>
                <svg viewBox={`-100 70 ${width + 50} ${height + 100}`} height={height - 100} width={width - 200} className="graph2">
                    {children}
                </svg>
            </MediaQuery>
            <MediaQuery maxWidth={400}>
                <svg viewBox={`190 -34 ${width - 200} ${height + 200}`} height={height - 120} width={width - 200} className="graph2">
                    {children}
                </svg>
            </MediaQuery>

        </>

    )
}

const Bar = ({ fill = 'white', x, y, height, width, name, color, skill_points }) => {

    const [hover, setHover] = useState(false);

    return (
        <>
            <rect fill={fill} x={x} y={y} height={height} width={width} style={{ fill: hover ? color : "teal" }} />
            <rect fill={'transparent'} x={x} y={0} height={height + y} width={width}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ cursor: 'pointer' }}
            />

            <text x={x} y={y}
                style={{
                    fill: 'white',
                    display: hover ? "block" : "none",
                    fontSize: "25px",
                }}
                onMouseEnter={() => setHover(true)}
            >
                {skill_points}</text>
            <svg x={x + 10} y={y + height + 20} style={{ overflow: 'auto' }}>
                <rect x={0} y={3} width={width} height={5} fill={color} stroke={color} style={{ transform: "rotate(45deg)" }} />
                <text
                    style={{
                        fill: "white",
                        transform: 'rotate(45deg)',
                        border: `solid 1px ${color}`
                    }}
                >
                    {
                        name === "Game Development" ? "Game Dev." :
                            name === "Systems Administration" ? "Sys. Admin" :
                                name
                    }
                </text>
            </svg>
        </>
    )
}

const greatestValue = values =>
    values.reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity)

const BarChart = ({ data }) => {
    const barWidth = 35
    const barMargin = 15
    const width = data.length * (barWidth + barMargin)
    const height = greatestValue(data.map(datum => datum.skill_points))

    return (


        <Chart height={height} width={width}>
            {data.map((datum, index) => (
                <Bar
                    key={datum.name}
                    fill="teal"
                    x={index * (barWidth + barMargin) - 50}
                    y={height - datum.skill_points}
                    width={barWidth}
                    height={datum.skill_points}
                    name={datum.name}
                    color={datum.color}
                    skill_points={datum.skill_points} />
            ))}
        </Chart>



    )
}

export default BarChart;
