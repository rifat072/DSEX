import axios from "axios"
import { NextResponse } from "next/server"

export const GET = async (req) => {

    const { searchParams } = new URL(req.url)
    let tradingCodes = searchParams.get('tradingcodes')
    tradingCodes = tradingCodes.split(",")

    const maDatasWithTradingCode = []
    for (const tradingCode of tradingCodes) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/history?tradingcode=${tradingCode}`)
        const data = res.data
        const maData = calculateMovingAverages(data).reverse()

        maDatasWithTradingCode.push({
            tradingCode: tradingCode,
            maData: maData
        })
    }

    const ma10above = []
    const ma20above = []
    const ma50above = []
    const ma200above = []

    const ma10below = []
    const ma20below = []
    const ma50below = []
    const ma200below = []

    for (const maData of maDatasWithTradingCode) {
        const todayValue = maData.maData[0]
        if (todayValue.ma10 < todayValue.close) {
            ma10above.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma10
            })
        }
        if (todayValue.ma20 < todayValue.close) {
            ma20above.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma20
            })
        }
        if (todayValue.ma50 < todayValue.close) {
            ma50above.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma50
            })
        }
        if (todayValue.ma200 < todayValue.close) {
            ma200above.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma200
            })
        }


        if (todayValue.ma10 > todayValue.close) {
            ma10below.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma10
            })
        }
        if (todayValue.ma20 > todayValue.close) {
            ma20below.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma20
            })
        }
        if (todayValue.ma50 > todayValue.close) {
            ma50below.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma50
            })
        }
        if (todayValue.ma200 > todayValue.close) {
            ma200below.push({
                tradingCode: maData.tradingCode,
                ma: todayValue.ma200
            })
        }
    }


    return NextResponse.json({ ma10above, ma20above, ma50above, ma200above, ma10below, ma20below, ma50below, ma200below })
}

function calculateMovingAverages(data) {
    // Sort from oldest to newest
    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Helper to calculate average
    const average = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

    return sorted.map((item, index) => {
        const closePrices = sorted.slice(0, index + 1).map(d => parseFloat(d.close || d.ltp));

        const getWindowAvg = (windowSize) => {
            const start = Math.max(0, index - windowSize + 1);
            const window = closePrices.slice(start, index + 1);
            return average(window);
        };

        return {
            date: item.date,
            close: parseFloat(item.close || item.ltp),
            ma10: getWindowAvg(10),
            ma20: getWindowAvg(20),
            ma50: getWindowAvg(50),
            ma200: getWindowAvg(200),
        };
    });
}