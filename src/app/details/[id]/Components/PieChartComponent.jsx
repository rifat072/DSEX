"use client"
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

export default function PieChartComponent({ data, title }) {
    return (
        <div className='rounded-xl bg-slate-100'>
            <h1 className='text-center font-bold'>{title}</h1>
            <ResponsiveContainer
                height={200}
                width="100%"
            >
                <PieChart
                    accessibilityLayer
                    activeShape={{
                        fill: 'red'
                    }}
                    data={data}
                    syncMethod="index"
                >
                    <Pie
                        activeShape={{
                            fill: 'red'
                        }}
                        data={data}
                        dataKey="value"
                    />
                    <Tooltip defaultIndex={0} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

