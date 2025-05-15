"use client"

import { useState, useEffect } from "react"
import { Calendar, RefreshCw, Filter } from "lucide-react"
import EventsTable from "./components/EventsTable"
import FilterPanel from "./components/FilterPanel"
import { fetchEvents, fetchFilteredEvents } from "./services/api"
import "./App.css"

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    country: "",
    impact: "",
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const loadEvents = async () => {
    try {
      setLoading(true)
      let data

      if (filters.country || filters.impact) {
        data = await fetchFilteredEvents(filters)
      } else {
        data = await fetchEvents()
      }

      setEvents(data)
      setError(null)
    } catch (err) {
      setError("Failed to load economic events. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleRefresh = () => {
    loadEvents()
  }

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <header className="bg-white shadow w-full">
        <div className="w-full px-4 py-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Economic Calendar</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleFilterPanel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-4 py-4 flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          {isFilterOpen && (
            <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow shrink-0">
              <FilterPanel onFilterChange={handleFilterChange} currentFilters={filters} />
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow rounded-lg h-full overflow-hidden">
              <EventsTable events={events} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
