"use client"
import {
    ChartCanvas, Chart,
    CandlestickSeries, BarSeries,
    XAxis, YAxis,
    CrossHairCursor, MouseCoordinateX, MouseCoordinateY,
    OHLCTooltip, discontinuousTimeScaleProvider
} from "react-financial-charts";

import { format } from "d3-format";
import { timeParse } from "d3-time-format";
import React from 'react'

const parseDate = timeParse("%Y-%m-%d");

const formatData = (data) => {
    return data.map(d => ({
        date: parseDate(d.date),
        open: +d.open,
        high: +d.high,
        low: +d.low,
        close: +d.close,
        volume: +d.volume.replace(/,/g, ""),
    }));
};

export default function FinancialChart({ rawData }) {
    const data = formatData(rawData);

    const scaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const { data: chartData, xScale, xAccessor, displayXAccessor } = scaleProvider(data);
    const start = xAccessor(chartData[0]);
    const end = xAccessor(chartData[chartData.length - 1]);
    const xExtents = [start, end];

    return (
        <ChartCanvas
            height={500}
            width={1200}
            ratio={1}
            margin={{ left: 60, right: 60, top: 10, bottom: 30 }}
            data={chartData}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            xExtents={xExtents}
        >
            {/* Price Chart */}
            <Chart id={1} yExtents={d => [d.high, d.low]}>
                <XAxis />
                <YAxis />
                <CandlestickSeries />
                <MouseCoordinateX displayFormat={timeParse("%Y-%m-%d")} />
                <MouseCoordinateY displayFormat={format(".2f")} />
                <OHLCTooltip origin={[8, 16]} />
            </Chart>

            {/* Volume Chart */}
            {/* <Chart
                id={2}
                yExtents={d => d.volume}
                height={100}
                origin={(w, h) => [0, h - 100]}
            >
                <YAxis ticks={4} tickFormat={format(".2s")} />
                <BarSeries yAccessor={d => d.volume} />
            </Chart> */}

            <CrossHairCursor />
        </ChartCanvas>
    );
}
