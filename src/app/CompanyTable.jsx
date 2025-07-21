"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelectedCompanies } from './hooks/useSelectedCompanies'

export default function CompanyTable({ companies }) {
    const [selectedCompanies, setSelectedCompanies] = useSelectedCompanies()


    const handleCheckboxChange = (tradingCode) => {
        let updatedCompanies = []
        if (selectedCompanies.includes(tradingCode)) {
            updatedCompanies = selectedCompanies.filter(code => code !== tradingCode)
        } else {
            updatedCompanies = [...selectedCompanies, tradingCode]
        }
        setSelectedCompanies(updatedCompanies)
        localStorage.setItem("selectedCompanies", JSON.stringify(updatedCompanies))
    }

    return (
        <>

            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Trading Code</th>
                        <th>Last Trade Price / Closing Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>


                    {companies.map(company => {
                        return (
                            <tr key={company.tradingCode}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox"
                                            checked={selectedCompanies.includes(company.tradingCode)}
                                            onChange={() => handleCheckboxChange(company.tradingCode)}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">

                                                <Image width={50} height={50} src={`https://prod-ssl-app-storage.s3.amazonaws.com/company/logo/${company.tradingCode}.svg`} alt={company.tradingCode}></Image>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{company.tradingCode}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-sm"> ৳ {company.lastPrice}</span>
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs"><Link href={`/details/${company.tradingCode}`}>Details</Link></button>
                                </th>
                            </tr>

                        )
                    })}

                </tbody>

            </table>
        </>



    )
}
