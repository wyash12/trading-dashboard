
"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

const EventsTable = ({ events, loading }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  })

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortedEvents = () => {
    if (!events || events.length === 0) return []

    const sortableEvents = [...events]
    sortableEvents.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
    return sortableEvents
  }

  const sortedEvents = getSortedEvents()

  const getSentimentColor = (sentiment) => {
    if (sentiment === "Bullish") return "text-green-600"
    if (sentiment === "Bearish") return "text-red-600"
    return "text-gray-600"
  }

  const getImpactColor = (impact) => {
    if (impact === "High") return "bg-red-100 text-red-800"
    if (impact === "Medium") return "bg-yellow-100 text-yellow-800"
    if (impact === "Low") return "bg-blue-100 text-blue-800"
    return "bg-gray-100 text-gray-800"
  }

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[180px]"
              onClick={() => requestSort("date")}
            >
              <div className="flex items-center">
                Date & Time
                <SortIcon column="date" />
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[200px]"
              onClick={() => requestSort("event")}
            >
              <div className="flex items-center">
                Event
                <SortIcon column="event" />
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[150px]"
              onClick={() => requestSort("country")}
            >
              <div className="flex items-center">
                Country
                <SortIcon column="country" />
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]"
            >
              Forecast
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]"
            >
              Actual
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]"
            >
              Previous
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[120px]"
              onClick={() => requestSort("impact")}
            >
              <div className="flex items-center">
                Impact
                <SortIcon column="impact" />
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-[120px]"
              onClick={() => requestSort("sentiment")}
            >
              <div className="flex items-center">
                Sentiment
                <SortIcon column="sentiment" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="8" className="px-4 py-4 text-center">
                <div className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 text-blue-500 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading events...
                </div>
              </td>
            </tr>
          ) : sortedEvents.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">
                No economic events found.
              </td>
            </tr>
          ) : (
            sortedEvents.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {event.date} {event.time && `at ${event.time}`}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 truncate max-w-[200px]">{event.event}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-1">{event.country}</span>
                    <span className="text-xs text-gray-400">({event.currency})</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.forecast || "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.actual || "Pending"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.previous || "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getImpactColor(event.impact)}`}
                  >
                    {event.impactBadge || event.impact}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`font-medium ${getSentimentColor(event.sentiment)}`}>
                    {event.sentimentIcon} {event.sentiment}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EventsTable
