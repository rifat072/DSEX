"use client"
import axios from 'axios'

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AnalysisTable } from './Component/AnalysisTable'

export default function AnalysisPage() {

    const [analysisData, setAnalysisData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const loadData = async () => {
            const stored = localStorage.getItem("selectedCompanies")
            if (!stored) {
                setLoading(false)
                return;
            }
            const params = new URLSearchParams()
            params.append('tradingcodes', JSON.parse(stored))
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/analysis?${params}`)
            const data = await res.data
            setAnalysisData(data)
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading === true) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className="radial-progress animate-spin" style={{ "--value": 70 }}>Loading</div>
            </div>
        )
    } else if (analysisData === null) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-2xl font-bold'>No Data Selected</h1>
            </div>
        )
    } else {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-6 text-black'>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-green-400 font-bold'>Above</span> MA 10</h1>
                    <AnalysisTable data={analysisData["ma10above"]}></AnalysisTable>
                </div>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-green-400 font-bold'>Above</span> MA 20</h1>
                    <AnalysisTable data={analysisData["ma20above"]}></AnalysisTable>
                </div>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-green-400 font-bold'>Above</span> MA 50</h1>
                    <AnalysisTable data={analysisData["ma50above"]}></AnalysisTable>
                </div>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-green-400 font-bold'>Above</span> MA 200</h1>
                    <AnalysisTable data={analysisData["ma200above"]}></AnalysisTable>
                </div>


                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-red-400 font-bold'>Below</span> MA 10</h1>
                    <AnalysisTable data={analysisData["ma10below"]}></AnalysisTable>
                </div>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-red-400 font-bold'>Below</span> MA 20</h1>
                    <AnalysisTable data={analysisData["ma20below"]}></AnalysisTable>
                </div>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-red-400 font-bold'>Below</span> MA 50</h1>
                    <AnalysisTable data={analysisData["ma50below"]}></AnalysisTable>
                </div>
                <div className='bg-slate-100 p-3 rounded-xl'>
                    <h1 className='text-center font-semibold font-xl'>Current price <span className='text-red-400 font-bold'>Below</span> MA 200</h1>
                    <AnalysisTable data={analysisData["ma200below"]}></AnalysisTable>
                </div>


            </div>
        )
    }


}

