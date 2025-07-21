"use client"
import Link from 'next/link'
import React from 'react'
import { useSelectedCompanies } from './hooks/useSelectedCompanies'

export default function Navbar() {

    const handleSearch = (text) => {
        console.log(text)
    }

    const [selectedCompanies, setSelectedCompanies] = useSelectedCompanies()
    return (
        <div className='w-full flex justify-center items-center gap-7'>
            {/* <label className="input border-2 border-slate-100 mx-auto">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder="Search"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
            </label> */}

            <Link href={'/'}><button className='btn btn-outline'>Home</button></Link>
            <Link href={'/analysis'}><button className='btn btn-outline'>Analyze Selected</button></Link>
            <Link href={'/calculator'}><button className='btn btn-outline'>Calculator</button></Link>


        </div >
    )
}
