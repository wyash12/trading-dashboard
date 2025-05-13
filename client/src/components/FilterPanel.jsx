"use client"

import { useState, useEffect } from "react"

const FilterPanel = ({ onFilterChange, currentFilters }) => {
  const [filters, setFilters] = useState({
    country: currentFilters.country || "",
    impact: currentFilters.impact || "",
  })

  useEffect(() => {
    setFilters({
      country: currentFilters.country || "",
      impact: currentFilters.impact || "",
    })
  }, [currentFilters])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilterChange(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      country: "",
      impact: "",
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const countries = [
    { value: "", label: "All Countries" },
    { value: "USD", label: "United States (USD)" },
    { value: "EUR", label: "Eurozone (EUR)" },
    { value: "GBP", label: "United Kingdom (GBP)" },
    { value: "JPY", label: "Japan (JPY)" },
    { value: "AUD", label: "Australia (AUD)" },
    { value: "CAD", label: "Canada (CAD)" },
    { value: "CHF", label: "Switzerland (CHF)" },
    { value: "CNY", label: "China (CNY)" },
  ]

  const impacts = [
    { value: "", label: "All Impacts" },
    { value: "High", label: "High Impact" },
    { value: "Medium", label: "Medium Impact" },
    { value: "Low", label: "Low Impact" },
  ]

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country (Currency)
            </label>
            <select
              id="country"
              name="country"
              value={filters.country}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="impact" className="block text-sm font-medium text-gray-700">
              Impact Level
            </label>
            <select
              id="impact"
              name="impact"
              value={filters.impact}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {impacts.map((impact) => (
                <option key={impact.value} value={impact.value}>
                  {impact.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FilterPanel
