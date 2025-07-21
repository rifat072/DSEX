"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export const BarChartComponent = ({ data, title, xAxis, yAxis }) => {
    const renderBarChart = (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
                <XAxis dataKey={xAxis} stroke="#8884d8" />
                <YAxis dataKey={yAxis} />
                <Tooltip />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey={yAxis} fill="#8884d8" barSize='5%' />
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className='rounded-xl bg-slate-100'>
            <h1 className='text-center font-bold'>{title}</h1>
            {renderBarChart}
        </div>
    )
}

export default BarChartComponent