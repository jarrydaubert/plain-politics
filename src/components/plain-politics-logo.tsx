type PlainPoliticsMarkProps = {
  className?: string;
};

export function PlainPoliticsMark({ className }: PlainPoliticsMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#071F3A" height="128" rx="28" width="128" />
      <path d="M32 32L43 20L54 32L64 20L75 32L85 20L96 32V43H32V32Z" fill="#C8102E" />
      <path d="M36 47H58V104H36V47Z" fill="#F8FAFC" />
      <path
        d="M52 47H76C92.8 47 104 57.5 104 72C104 86.5 92.8 97 76 97H52V79H75C82.4 79 86.8 76.1 86.8 72C86.8 67.9 82.4 65 75 65H52V47Z"
        fill="#F8FAFC"
      />
      <rect fill="#071F3A" height="14" rx="7" width="18" x="58" y="65" />
    </svg>
  );
}
