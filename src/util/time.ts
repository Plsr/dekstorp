export const buildTimeString = (hours: number, minutes: number): string => {
  return `${hours.toString()}:${minutes.toString()}`
}

export const hoursMinutesFromString = (
  timeString: string,
): [hours: number, minutes: number] => {
  const times = timeString.split(':')
  if (times.length !== 2) throw new Error('Malformed timestring')
  return [parseInt(times[0]), parseInt(times[1])]
}
