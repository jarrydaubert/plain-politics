type DateValue = Date | number | string;

const ukDateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "Europe/London"
});

const ukTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/London"
});

export function formatUkDate(value: DateValue) {
  return ukDateFormatter.format(new Date(value));
}

export function formatUkDateTime(value: DateValue) {
  return `${formatUkDate(value)} at ${formatUkTime(value)}`;
}

export function formatUkTime(value: DateValue) {
  return ukTimeFormatter.format(new Date(value));
}

export function maxIsoDate(values: string[]) {
  return values.reduce<string | null>(
    (latest, value) => (latest === null || value > latest ? value : latest),
    null
  );
}
