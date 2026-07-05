type PlainPoliticsMarkProps = {
  className?: string;
  variant?: "bare" | "tile";
};

export function PlainPoliticsMark({ className, variant = "tile" }: PlainPoliticsMarkProps) {
  const bare = variant === "bare";

  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox={bare ? "20 20 96 96" : "0 0 128 128"}
      xmlns="http://www.w3.org/2000/svg"
    >
      {bare ? null : <rect fill="#071F3A" height="128" rx="28" width="128" />}
      <rect fill={bare ? "currentColor" : "#F8FAFC"} height="68" width="16" x="30" y="30" />
      <path
        d="M46 30H62A26 26 0 0 1 62 82H46V66H62A10 10 0 0 0 62 46H46Z"
        fill={bare ? "currentColor" : "#F8FAFC"}
      />
      <circle cx="95" cy="89" fill={bare ? "var(--stop-red-on-ink)" : "#D62E4C"} r="9" />
    </svg>
  );
}
