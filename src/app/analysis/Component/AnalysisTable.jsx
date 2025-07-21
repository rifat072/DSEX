import Image from "next/image"
import Link from "next/link"

export function AnalysisTable({ data }) {
    return (
        <div>
            <div>
                <div>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Trading Code</th>
                                <th>Average</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map(company => {
                                return (
                                    <tr key={company.tradingCode}>
                                        <td>
                                            <div className="flex items-center">
                                                <div>

                                                    <button className="btn btn-ghost btn-xs"><Link href={`/details/${company.tradingCode}`}><Image width={50} height={50} src={`https://prod-ssl-app-storage.s3.amazonaws.com/company/logo/${company.tradingCode}.svg`} alt={company.tradingCode}></Image></Link></button>

                                                </div>
                                                <div>
                                                    <div className="font-bold">{company.tradingCode}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost badge-sm"> ৳ {company.ma.toFixed(2)}</span>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>


        </div>
    )
}
