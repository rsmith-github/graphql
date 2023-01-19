import React from "react";
import { useState } from 'react';

const Chart = ({ children, height, width }) => (
    <svg viewBox={`0 -20 ${width} ${height + 100}`} height={height} width={width} className="graph2">
        {children}
    </svg>
)

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
                    x={index * (barWidth + barMargin)}
                    y={height - datum.skill_points}
                    width={barWidth}
                    height={datum.skill_points}
                    name={datum.name}
                    color={datum.color}
                    skill_points={datum.skill_points}
                />
            ))}
        </Chart>
    )
}

export default BarChart;
