function formatDateYYYYMMDD(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export { formatDateYYYYMMDD };
