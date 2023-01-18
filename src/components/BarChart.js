import React from "react";

const Chart = ({ children, height, width }) => (
    <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width} className="graph2">
        {children}
    </svg>
)

const Bar = ({ fill = '#000', x, y, height, width }) => (
    <rect fill={fill} x={x} y={y} height={height} width={width} />
)

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
                />
            ))}
        </Chart>
    )
}

export default BarChart;
