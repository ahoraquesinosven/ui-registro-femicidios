export type YesNoUnknown = "yes" | "no" | "unknown";

export function yesNoUnknownToBoolean(value: YesNoUnknown): boolean | undefined {
    if (value === "yes") {
        return true;
    }

    if (value === "no") {
        return false;
    }

    return undefined;
}

export function stringToInteger(value: string): number | undefined {
    const result = parseInt(value);

    if (isNaN(result)) {
        return undefined;
    }

    return result;
}

export function stringToFloat(value: string): number | undefined {
    const result = parseFloat(value);

    if (isNaN(result)) {
        return undefined;
    }

    return result;
}

export function stringToEnum<T>(value: string | null | undefined): T | undefined {
    return (value !== null && value !== undefined) ? value as T : undefined;
}


