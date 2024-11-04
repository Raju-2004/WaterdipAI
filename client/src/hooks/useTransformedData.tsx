// hooks/useTransformedData.ts
import { useMemo } from 'react'
import { Booking, TimeSeriesData, ColumnChartData, SparkLineChartData } from '../types'
import { parseBookingDate } from '../utils/dataUtils'

export const useFilteredData = (data: Booking[], dateRange: any) => {
  return useMemo(() => {
    if (!data.length) return []

    if (!dateRange.startDate || !dateRange.endDate) return data

    return data.filter((booking) => {
      const bookingDate = parseBookingDate(
        booking.arrival_date_year,
        booking.arrival_date_month,
        booking.arrival_date_day_of_month
      )
      return bookingDate >= dateRange.startDate && bookingDate <= dateRange.endDate
    })
  }, [dateRange, data])
}

export const useTimeSeriesData = (filteredData: Booking[]) => {
  return useMemo(() => {
    const dateMap: { [key: string]: number } = {}

    filteredData.forEach((booking) => {
      const date = parseBookingDate(
        booking.arrival_date_year,
        booking.arrival_date_month,
        booking.arrival_date_day_of_month
      )
        .toISOString()
        .split('T')[0]

      if (!dateMap[date]) {
        dateMap[date] = 0
      }

      dateMap[date] += booking.adults + booking.children + booking.babies
    })

    return Object.keys(dateMap)
      .map((date) => ({
        date,
        visitors: dateMap[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredData])
}

export const useColumnChartData = (filteredData: Booking[]) => {
  return useMemo(() => {
    const countryMap: { [country: string]: number } = {}

    filteredData.forEach((booking) => {
      const country = booking.country
      if (!countryMap[country]) {
        countryMap[country] = 0
      }
      countryMap[country] += booking.adults + booking.children + booking.babies
    })

    return Object.keys(countryMap).map((country) => ({
      country,
      visitors: countryMap[country],
    }))
  }, [filteredData])
}

export const useSparkLineData = (filteredData: Booking[], type: 'adults' | 'children') => {
  return useMemo(() => {
    const Array = filteredData.map((booking) => booking[type])
    const total = Array.reduce((acc, value) => acc + value, 0)

    return { Array, total }
  }, [filteredData, type])
}
