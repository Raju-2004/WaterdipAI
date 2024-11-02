import express from 'express'
import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

const app = express()

interface Booking {
  arrival_date_year: string
  arrival_date_month: string
  arrival_date_day_of_month: string
  adults: number
  children: number
  babies: number
  country: string
}

const BookingData: Booking[] = []

fs.createReadStream(path.join(__dirname, 'hotel_bookings_1000.csv'))
  .pipe(csv())
  .on('data', (row) => {
    BookingData.push({
      arrival_date_year: row.arrival_date_year,
      arrival_date_month: row.arrival_date_month,
      arrival_date_day_of_month: row.arrival_date_day_of_month,
      adults: parseInt(row.adults),
      children: parseInt(row.children || 0),
      babies: parseInt(row.babies || 0),
      country: row.country,
    })
  })
  .on('end', () => {
    console.log('CSV file successfully processed')
  })

app.get('/bookings', (req, res) => {
  res.status(200).json(BookingData)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
