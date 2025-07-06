export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  const formattedDate = new Date(date).toLocaleDateString('pt-BR', options)

  return formattedDate
}
