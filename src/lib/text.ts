export function cleanOptionalText(value: string | null | undefined) {
  const cleaned = value?.replace(/\s+/g, " ").trim();

  return cleaned || undefined;
}
