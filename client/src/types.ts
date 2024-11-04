export interface Booking {
  arrival_date_year: string
  arrival_date_month: string
  arrival_date_day_of_month: string
  adults: number
  children: number
  babies: number
  country: string
}

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface TimeSeriesData {
  date: string
  visitors: number
}

export interface ColumnChartData {
  country: string
  visitors: number
}

export interface SparkLineChartData {
  Array: number[]
  total: number
}
