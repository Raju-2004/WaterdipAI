import { useState, useEffect } from 'react'
import { Booking } from '../types'

export const useBookings = () => {
  const [data, setData] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  return { data, isLoading }
}
