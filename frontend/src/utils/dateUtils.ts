export function jsDateToShortIso(d: Date): string {
  const fullDay = String(d.getDate()).padStart(2, "0");
  const fullMonth = String(d.getMonth() + 1).padStart(2, "0");
  const fullYear = d.getFullYear();

  return `${fullYear}-${fullMonth}-${fullDay}`;
}

export function getFirstDayOfCurrentMonth(): Date {
  return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
}
