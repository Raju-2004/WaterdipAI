import React, { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Charts } from './components/Charts'
import { DateRange } from './types'
import './dashboard.css'
import { useBookings } from './hooks/useBookings'
import { useColumnChartData, useFilteredData, useSparkLineData, useTimeSeriesData } from './hooks/useTransformedData'

const Dashboard: React.FC = () => {
  const { data, isLoading } = useBookings()

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  })

  const filteredData = useFilteredData(data, dateRange)
  const timeSeriesData = useTimeSeriesData(filteredData)
  const columnChartData = useColumnChartData(filteredData)
  const adultVisitors = useSparkLineData(filteredData, 'adults')
  const childrenVisitors = useSparkLineData(filteredData, 'children')

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDateRange((prev) => ({
      ...prev,
      [name]: value ? new Date(value) : null,
    }))
  }

  const handleClearDates = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    })
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-title-container">
        <h1 className="dashboard-title">Hotel Bookings Dashboard</h1>

        <div className="date-range-picker">
          <Calendar className="calendar-icon" size={20} />
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate?.toISOString().split('T')[0] || ''}
            onChange={handleDateChange}
          />
          <span>to</span>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate?.toISOString().split('T')[0] || ''}
            onChange={handleDateChange}
          />
          {(dateRange.startDate || dateRange.endDate) && <button onClick={handleClearDates}>Clear</button>}
        </div>
      </div>

      <Charts
        columnChartData={columnChartData}
        timeSeriesData={timeSeriesData}
        AdultVisitors={adultVisitors}
        ChildrenVisitors={childrenVisitors}
      />
    </div>
  )
}

export default Dashboard
