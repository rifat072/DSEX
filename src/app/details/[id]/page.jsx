import { parse } from 'node-html-parser';
import React from 'react'
import axios from 'axios';
import BarChartComponent from './Components/BarChartComponent';
import PieChartComponent from './Components/PieChartComponent';
import FinancialChart from './Components/FinancialChart';


const getCompanyName = (obj) => {
    return obj.innerText.split(": ")[1].trim()
}

const getCompanyInfo = (obj) => {
    const info = obj.innerText.trim().split('\n')
    const ret = {
        stripCode: info[1].trim().split(": ")[1].trim(),
        tradingCode: info[0].trim().split(": ")[1].trim()
    }
    return ret
}

const getCurrentInfo = (obj) => {
    const arr = obj.innerText.split("\n").filter(data => {
        const trimmedData = data.trim()
        if (trimmedData !== "" && trimmedData !== undefined) {
            return true
        }
        return false
    })


    const getNextIndex = (str) => {
        const idx = arr.findIndex((value) => {
            return value.includes(str)
        })
        return idx + 1
    }
    const ret = {
        ltp: arr[getNextIndex("Last Trading Price")].trim(),
        cp: arr[getNextIndex("Closing Price")].trim(),
        lastUpdate: arr[getNextIndex("Last Update")].trim(),
        ycp: arr[getNextIndex("Yesterday's Closing Price")].trim(),
        marketCap: arr[getNextIndex("Market Capitalization")].trim()

    }
    return ret;
}

const getBasicInfo = (obj) => {
    const arr = obj.innerText.split("\n").filter(data => {
        const trimmedData = data.trim()
        if (trimmedData !== "" && trimmedData !== undefined) {
            return true
        }
        return false
    })
    const getNextIndex = (str) => {
        const idx = arr.findIndex((value) => {
            return value.includes(str)
        })
        return idx + 1
    }
    const ret = {
        authCapital: arr[getNextIndex("Authorized Capital")].trim(),
        paidUp: arr[getNextIndex("Paid-up Capital")].trim(),
        sector: arr[getNextIndex("Sector")].trim()
    }
    return ret
}


const getDividend = (obj) => {
    let ret = []
    const titles = obj.querySelectorAll('th')
    for (const title of titles) {
        if (title.innerHTML.includes('Cash Dividend')) {
            const value = title.nextElementSibling.innerHTML.trim()
            const arr = value.split(", ")
            for (const val of arr) {
                const splits = val.split(" ")
                ret.push({
                    year: parseInt(splits[1]),
                    dividend: parseInt(splits[0])
                })
            }
        }
    }
    return ret;
}

const getEPS_NAV_Profit = (obj) => {
    let ret = []
    const tableDatas = obj.querySelectorAll('td')
    tableDatas.splice(0, 19)
    const newArr = [];
    while (tableDatas.length) newArr.push(tableDatas.splice(0, 13));
    for (const value of newArr) {
        const newObj = {
            year: parseInt(value[0].innerText.trim()),
            eps: parseFloat(value[4].innerText.trim()),
            nav: parseFloat(value[7].innerText.trim()),
            profit: parseFloat(value[11].innerText.trim())

        }
        ret.push(newObj)
    }
    return ret;
}

const getPE = (obj) => {
    let ret = []
    const tableDatas = obj.querySelectorAll('td')
    tableDatas.splice(0, 14)

    const newArr = [];
    while (tableDatas.length) newArr.push(tableDatas.splice(0, 9));
    for (const value of newArr) {
        const newObj = {
            year: parseInt(value[0].innerText.trim()),
            pe: parseFloat(value[4].innerText.trim())
        }
        ret.push(newObj)
    }
    return ret;
}

const getShareHolders = (obj) => {
    let ret = []
    let tableDatas = obj.querySelectorAll('td')
    tableDatas = tableDatas.slice(-7)
    tableDatas.pop()
    tableDatas.pop()
    for (const value of tableDatas) {
        const holders = value.innerHTML.split("<br>")
        ret.push({
            name: holders[0].trim(),
            value: parseFloat(holders[1].trim())
        })
    }
    return ret;

}

export async function DetailsPage({ params }) {
    const prop = await params
    const url = 'https://www.dsebd.org/displayCompany.php?name=' + prop.id
    const { data } = await axios.get(url)
    const root = parse(data)
    const headers = root.querySelectorAll(".topBodyHead")
    const companyName = getCompanyName(headers[0])
    const companyInfo = getCompanyInfo(headers[0].nextElementSibling.children[0])
    const currentInfo = getCurrentInfo(headers[1].nextElementSibling.children[0])
    const basicInfo = getBasicInfo(headers[2].nextElementSibling.children[0])
    const dividends = getDividend(headers[3].nextElementSibling.children[0])
    const eps_nav_profit = getEPS_NAV_Profit(headers[7].nextElementSibling.children[0])
    const pe = getPE(headers[8].nextElementSibling.children[0])
    const shareHolders = getShareHolders(headers[9].nextElementSibling.children[0])


    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/history?tradingcode=${prop.id}`)
    const ret = res.data
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 p-6'>

                <div className='bg-slate-100 p-3 rounded-xl flex flex-col justify-around'>
                    <h1 className='text-xl font-bold'>Trading Code: {companyInfo.tradingCode}</h1>
                    {/* Image */}
                    <p>{companyName}</p>
                    <p>Sector: {basicInfo.sector}</p>
                </div>

                <div className='bg-slate-100 p-3 rounded-xl flex flex-col justify-around'>
                    <h1 className='text-xl font-bold'>LTP: {currentInfo.ltp}</h1>
                    <p>YCP: {currentInfo.ycp}</p>
                </div>


                <div className='bg-slate-100 p-3 rounded-xl flex flex-col justify-around'>
                    <h1 className='text-xl font-bold'>Paid Up Capital: {basicInfo.paidUp}</h1>
                    <p>Auth Cap: {basicInfo.authCapital}</p>
                </div>

                <div className='bg-slate-100 p-3 rounded-xl flex flex-col justify-around'>
                    <h1 className='text-xl font-bold'>Market Capital: {currentInfo.marketCap}</h1>
                </div>
                <div>
                    <PieChartComponent data={shareHolders} title={"Current Shareholding"}></PieChartComponent>

                </div>


                <BarChartComponent data={dividends} xAxis={"year"} yAxis={"dividend"} title={"Dividend History"}></BarChartComponent>
                <BarChartComponent data={eps_nav_profit} xAxis={"year"} yAxis={"eps"} title={"EPS Growth"}></BarChartComponent>
                <BarChartComponent data={eps_nav_profit} xAxis={"year"} yAxis={"profit"} title={"Profit Growth"}></BarChartComponent>
                <BarChartComponent data={eps_nav_profit} xAxis={"year"} yAxis={"nav"} title={"Nav Growth"}></BarChartComponent>
                <BarChartComponent data={pe} xAxis={"year"} yAxis={"pe"} title={"P/E Growth"}></BarChartComponent>
            </div>
            <FinancialChart rawData={ret}></FinancialChart>
        </>

    )
}

export default DetailsPage