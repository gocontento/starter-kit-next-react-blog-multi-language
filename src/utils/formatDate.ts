export const formatDate = (dateString: string | undefined | null): string => {
  if (dateString) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  } else {
    return 'Invalid Date'
  }
}
