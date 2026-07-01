type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be emitted as raw script data.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("</", "<\\/")
      }}
      type="application/ld+json"
    />
  );
}
