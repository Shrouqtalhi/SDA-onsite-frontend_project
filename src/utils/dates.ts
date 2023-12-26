export function calculateDaysBetweenDates(date1: string, date2: string): number {
  const timeDifference = new Date(date2).getTime() - new Date(date1).getTime()

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

  return Math.round(daysDifference)
}
