import { useEffect } from "react"

const { useState } = require("react")

export const useSelectedCompanies = () => {
    const [selectedCompanies, setSelectedCompanies] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem("selectedCompanies")
        if (stored) {
            setSelectedCompanies(JSON.parse(stored))
        }
    }, [])

    return [
        selectedCompanies,
        setSelectedCompanies
    ]
}