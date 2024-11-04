import { useState, useEffect } from 'react'
import { Booking } from '../types'

export const useBookings = () => {
  const [data, setData] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(process.env.REACT_APP_API_URL + '/bookings')
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

  return { data, isLoading }
}
