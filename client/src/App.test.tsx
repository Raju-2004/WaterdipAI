import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from './Dashboard'

// Mock the custom hooks
jest.mock('./hooks/useTransformedData', () => ({
  useFilteredData: jest.fn(),
  useTimeSeriesData: jest.fn(),
  useColumnChartData: jest.fn(),
  useSparkLineData: jest.fn(),
}))

// Mock the Charts component
jest.mock('./components/Charts', () => ({
  Charts: jest.fn(() => <div data-testid="mock-charts">Charts Component</div>),
}))

const mockBookingsData = [
  {
    id: 1,
    checkIn: '2024-01-01',
    checkOut: '2024-01-05',
    adults: 2,
    children: 1,
    roomType: 'standard',
    totalPrice: 500,
  },
  {
    id: 2,
    checkIn: '2024-01-06',
    checkOut: '2024-01-10',
    adults: 2,
    children: 0,
    roomType: 'deluxe',
    totalPrice: 800,
  },
]

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Mock the fetch call
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockBookingsData),
      })
    ) as jest.Mock

    // Mock the environment variable
    process.env.REACT_APP_API_URL = 'http://test-api.com'
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders loading state initially', () => {
    render(<Dashboard />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders dashboard title after loading', async () => {
    render(<Dashboard />)
    await waitFor(() => {
      expect(screen.getByText('Hotel Bookings Dashboard')).toBeInTheDocument()
    })
  })

  test('fetches and displays data correctly', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://test-api.com/bookings')
      // expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })

  test('handles API error Correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    global.fetch = jest.fn(() => Promise.reject('API Error')) as jest.Mock

    render(<Dashboard />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching data:', 'API Error')
    })

    consoleSpy.mockRestore()
  })
})
