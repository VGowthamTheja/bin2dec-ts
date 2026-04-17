type Props = {
  binary: string;
  onChange: (value: string) => void;
};

export default function BitToggle({ binary, onChange }: Props) {
  const maxBits = 8;

  const padded = binary.padStart(maxBits, "0");

  const toggleBit = (index: number) => {
    let updated = "";

    for (let i = 0; i < padded.length; i++) {
      if (i === index) {
        updated += padded[i] === "1" ? "0" : "1";
      } else {
        updated += padded[i];
      }
    }

    // remove leading zeros for clean input
    onChange(updated.replace(/^0+/, "") || "0");
  };

  return (
    <div className="bit-container">
      {Array.from({ length: maxBits }).map((_, i) => (
        <div
          key={i}
          className={`bit ${padded[i] === "1" ? "on" : ""}`}
          onClick={() => toggleBit(i)}
        >
          {padded[i]}
        </div>
      ))}
    </div>
  );
}