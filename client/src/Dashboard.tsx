import React, { useState, useEffect, useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Calendar } from 'lucide-react'
import { ApexOptions } from 'apexcharts'

interface Booking {
  arrival_date_year: string
  arrival_date_month: string
  arrival_date_day_of_month: string
  adults: number
  children: number
  babies: number
  country: string
}

interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

interface TimeSeriesData {
  date: string
  visitors: number
}

interface ColumnChartData {
  country: string
  visitors: number
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  })

  const getMonthNumber = (monthName: string): number => {
    const months: { [key: string]: number } = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    }
    return months[monthName] || 1
  }

  // Fetch data only once
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/bookings')
        const bookings: Booking[] = await response.json()
        setData(bookings)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (!data.length) return []

    // If no date range is selected, return all data
    if (!dateRange.startDate || !dateRange.endDate) return data

    // Otherwise filter based on date range
    return data.filter((booking) => {
      const bookingDate = new Date(
        parseInt(booking.arrival_date_year),
        getMonthNumber(booking.arrival_date_month),
        parseInt(booking.arrival_date_day_of_month)
      )
      return bookingDate >= dateRange.startDate! && bookingDate <= dateRange.endDate!
    })
  }, [dateRange, data])

  // Memoize time series data
  const timeSeriesData = useMemo(() => {
    return filteredData
      .reduce((acc: TimeSeriesData[], booking) => {
        const date = `${booking.arrival_date_year}-${getMonthNumber(booking.arrival_date_month)}-${
          booking.arrival_date_day_of_month
        }`
        const existingEntry = acc.find((entry) => entry.date === date)

        if (existingEntry) {
          existingEntry.visitors += booking.adults + booking.children + booking.babies
        } else {
          acc.push({
            date,
            visitors: booking.adults + booking.children + booking.babies,
          })
        }
        return acc
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredData])

  const ColumnCharData = useMemo(() => {
    return filteredData.reduce((acc: ColumnChartData[], booking) => {
      const country = booking.country
      const existingEntry = acc.find((booking) => booking.country === country)

      if (existingEntry) {
        existingEntry.visitors += booking.adults + booking.babies + booking.children
      } else {
        acc.push({
          country,
          visitors: booking.adults + booking.babies + booking.children,
        })
      }

      return acc
    }, [])
  }, [filteredData])

  console.log(ColumnCharData)

  const timeSeriesOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'line',
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
        animations: {
          enabled: false,
        },
        background: '#ffffff',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: 'Daily Visitors',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
      xaxis: {
        type: 'datetime',
        categories: timeSeriesData.map((item) => item.date),
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      theme: {
        mode: 'light',
      },
    }),
    [timeSeriesData]
  )

  const ColumnChartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
        animations: {
          enabled: false,
        },
        background: '#ffffff',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: 'Daily Visitors',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
      xaxis: {
        type: 'category',
        categories: ColumnCharData.map((item) => item.country),
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      theme: {
        mode: 'light',
      },
    }),
    [ColumnCharData]
  )

  const timeSeriesSeries = useMemo(
    () => [
      {
        name: 'Total Visitors',
        data: timeSeriesData.map((item) => item.visitors),
      },
    ],
    [timeSeriesData]
  )

  const ColumnChartSeries = useMemo(
    () => [
      {
        name: 'Total Visitors Per Country',
        data: ColumnCharData.map((item) => item.visitors),
      },
    ],
    [ColumnCharData]
  )

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
    <div className="p-4 min-h-screen bg-gray-50">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Bookings Dashboard</h1>

        <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm">
          <Calendar className="text-gray-500" size={20} />
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate?.toISOString().split('T')[0] || ''}
            onChange={handleDateChange}
            className="border rounded px-2 py-1"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate?.toISOString().split('T')[0] || ''}
            onChange={handleDateChange}
            className="border rounded px-2 py-1"
          />
          {(dateRange.startDate || dateRange.endDate) && (
            <button onClick={handleClearDates} className="text-sm text-blue-600 hover:text-blue-800">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
          {timeSeriesData.length > 0 && (
            <ReactApexChart
              key={`chart-${timeSeriesData.length}`}
              options={timeSeriesOptions}
              series={timeSeriesSeries}
              type="line"
              height={400}
            />
          )}

          {timeSeriesData.length > 0 && (
            <ReactApexChart
              key={`chart-${ColumnCharData.length}`}
              options={ColumnChartOptions}
              series={ColumnChartSeries}
              type="bar"
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
