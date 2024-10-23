export const formatDate = (dateString: string | undefined | null): string => {
  if (dateString) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }
    return new Intl.DateTimeFormat('en-GB', options).format(date)
  } else {
    return 'Invalid Date'
  }
}
