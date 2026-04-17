import { useEffect, useState } from "react";
import { type ConversionStep } from "../types";

type Props = {
  steps: ConversionStep[];
};

export default function StepBreakdown({ steps }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if (!steps.length) return;

    setActiveIndex(-1);

    let i = 0;
    const interval = setInterval(() => {
      setActiveIndex(i);
      i++;

      if (i >= steps.length) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="steps">
      <h3>🧠 Calculation</h3>

      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === activeIndex ? "active" : ""}`}
        >
          {step.bit} × 2^{step.position} = {step.contribution}
        </div>
      ))}
    </div>
  );
}