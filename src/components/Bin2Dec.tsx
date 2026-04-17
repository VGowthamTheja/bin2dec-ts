import { useState, type KeyboardEvent } from "react";
import type { ConversionStep } from "../types";
import { convertBinaryToDecimal, generateSteps, validateBinary } from "../utils/converter";
import StepBreakdown from "./StepBreakdown";
import BitToggle from "./BitToggle";

export default function Bin2Dec() {
    const [binary, setBinary] = useState<string>("");
    const [decimal, setDecimal] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [steps, setSteps] = useState<ConversionStep[]>([]);
    const [copied, setCopied] = useState<boolean>(false);

    const handleConvert = () => {
        const err = validateBinary(binary);
        if (err) {
            setError(err);
            setDecimal(null);
            setSteps([]);
            return;
        }

        setError("");

        const result = convertBinaryToDecimal(binary);
        setDecimal(result);
        setSteps(generateSteps(binary));
    };

    const handleChange = (value: string) => {
        setBinary(value);
        setCopied(false);

        const err = validateBinary(value);
        if (err) {
            setError(err);
            setDecimal(null);
            setSteps([]);
        } else {
            setError("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleConvert();
        }
    };

    const handleCopy = async () => {
        if (decimal === null) return;

        await navigator.clipboard.writeText(decimal.toString());
        setCopied(true);

        setTimeout(() => setCopied(false), 1500);
    }

    const handleClear = () => {
        setBinary("");
        setDecimal(null);
        setError("");
        setSteps([]);
    }

    return (
            <div className="container">
                <h1>⚡ Bin2Dec Pro</h1>
                <div className="card">
                    <label>Binary Input</label>
                    <div className="input-wrapper">
                        <input
                            value={binary}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g. 101101"
                            maxLength={8}
                            className={error ? "input error" : "input"}
                        />

                        <span className="input-meta">{binary.length}/8</span>
                    </div>

                    {error && <div className="error-box">{error}</div>}

                    <div className="actions">
                        <button onClick={handleConvert} disabled={!binary || !!error}>Convert</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>

                    <label>Decimal Output</label>

                    <div className="output-box">
                        <span>{decimal ?? "--"}</span>
                        <button onClick={handleCopy} disabled={decimal === null}>
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    <StepBreakdown steps={steps} />
                    <BitToggle binary={binary} onChange={handleChange} />
                </div>
            </div>
    )
}