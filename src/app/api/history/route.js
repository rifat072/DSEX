import axios from "axios"
import { NextResponse } from "next/server"
import parse from "node-html-parser"

export const GET = async (req) => {
    const { searchParams } = new URL(req.url)
    let tradingcode = searchParams.get('tradingcode')
    const date = new Date();
    const formatted = date.toISOString().slice(0, 10);
    const historyUrl = `https://www.dsebd.org/day_end_archive.php?startDate=2024-01-01&endDate=${formatted}&inst=${tradingcode}&archive=data`
    const { data: historyData } = await axios.get(historyUrl)
    const historyRoot = await parse(historyData)
    const tables = historyRoot.querySelectorAll('tbody')[2].querySelectorAll('tr')

    const ret = []

    for (const singleData of tables) {
        const singleRow = singleData.querySelectorAll('td')
        const data = singleRow.map(val => val.innerText.trim())
        const obj = {
            date: data[1],
            ltp: data[3],
            high: data[4],
            low: data[5],
            open: data[6],
            close: data[7],
            ycp: data[8],
            trade: data[9],
            value: data[10],
            volume: data[11]
        }
        ret.push(obj)
    }

    return NextResponse.json(ret)
}