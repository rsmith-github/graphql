import React, { Component } from 'react'
import Plot from 'react-plotly.js'

class LineChart extends Component {
    
    render() {

        const {xyPoints} = this.props;
        const xValues = xyPoints.transaction.map((transaction) => (
            transaction.object.name
        ))
        const yValues = xyPoints.transaction.map((transaction) => (
            transaction.amount
        ))


        return (

            <Plot
                data={[
                    {
                        x: xValues,
                        y: yValues,
                        type: 'scatter'
                    }
                ]}
                layout={{ width: 1000, height: 300, title: 'XP in Piscine-Go' }}
            />
        )
    }
}

export default LineChart