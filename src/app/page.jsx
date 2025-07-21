
import axios from "axios";
import CompanyTable from "./CompanyTable";

export default async function Home() {
  const url = "https://www.dsebd.org/datafile/quotes.txt"

  const { data } = await axios.get(url)

  const companies = data.split("\n").map((singleData) => {
    const splitValue = singleData.split(" ")
    const obj = {
      tradingCode: splitValue[0],
      lastPrice: splitValue[splitValue.length - 1]
    }
    return obj
  })

  companies.splice(0, 4)


  return (
    <div className="">


      <div>
        <div className="mx-auto max-w-7xl">


          <CompanyTable companies={companies}></CompanyTable>
        </div>
      </div>

    </div >
  );
}
