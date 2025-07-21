"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function CalculatorPage() {
  const [bCost, setBCost] = useState(50.0)
  const [sPrice, setSPrice] = useState(55.0)
  const [quantity, setQuantity] = useState(10)
  const [gain, setGain] = useState(0)

  const handleCalculate = () => {
    const sellTotal = sPrice * 0.996 * quantity
    const buyTotal = bCost * quantity
    const result = sellTotal - buyTotal
    setGain(result.toFixed(2)) // show only 2 decimal places

    //const x = s * 0.996 * quant - (avb*quant)
  }

  useEffect(() => {
    handleCalculate()
  }, [bCost, sPrice, quantity])

  // Handles input safely and avoids NaN issues
  const handleNumberInput = (value, setter) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      setter(num)
    } else if (value === '') {
      setter(0)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="mx-auto card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset space-y-4">
            <label className="label">Average Buying Cost</label>
            <input
              type="number"
              className="input"
              step="0.10"
              value={bCost.toString()}
              onChange={(e) => handleNumberInput(e.target.value, setBCost)}
              placeholder="Buying Cost"
            />

            <label className="label">Selling Price</label>
            <input
              type="number"
              className="input"
              step="0.10"
              value={sPrice.toString()}
              onChange={(e) => handleNumberInput(e.target.value, setSPrice)}
              placeholder="Selling Price"
            />

            <label className="label">Quantity</label>
            <input
              type="number"
              className="input"
              value={quantity.toString()}
              onChange={(e) => handleNumberInput(e.target.value, (val) => setQuantity(Math.floor(val)))}
              placeholder="Quantity"
            />

            <p className='text-xl w-full text-center mx-auto'>
              Gain: <span className={gain >= 0 ? "text-green-600" : "text-red-600"}>৳{gain}</span>
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
