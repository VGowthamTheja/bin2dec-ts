import type { ConversionStep } from "../types";

export const validateBinary = (value: string): string => {
    for (let i = 0; i < value.length; i++) {
        if (value[i] !== "0" && value[i] !== "1") {
            return "Only 0's and 1's are allowed";
        }
    }

    if (value.length > 8) {
        return "Maximum 8 digits are allowed";
    }

    return "";
};

export const convertBinaryToDecimal = (bin: string): number => {
    let result = 0;
    let power = 0;

    for (let index = bin.length - 1; index >= 0; index--) {
        const digit = bin[index] === "1" ? 1 : 0;
        result += digit * Math.pow(2, power);
        power++;
    }

    return result;
}

export const generateSteps = (bin: string): ConversionStep[] => {
    const steps: ConversionStep[] = [];
    let power = 0;

    for (let i = bin.length - 1; i >= 0; i--) {
        const bit = Number(bin[i]);
        const value = Math.pow(2, power);

        steps.push({
            bit,
            position: power,
            value,
            contribution: bit * value,
        });

        power++;
    }

    return steps;
};
