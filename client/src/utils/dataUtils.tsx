export const getMonthNumber = (monthName: string): number => {
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

export const parseBookingDate = (year: string, month: string, day: string): Date => {
  return new Date(parseInt(year), getMonthNumber(month) - 1, parseInt(day))
}
