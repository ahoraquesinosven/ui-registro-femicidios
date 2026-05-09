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

export function booleanToYesNoUnknown(value?: boolean) : YesNoUnknown {
    if (value === undefined || value === null) {
        return "unknown";
    }

    return value ? "yes" : "no";
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


// TODO: These are a hack. We need to ensure combo inputs return an enum instead of a string
export function stringToOptionalEnum<T extends string>(value: string | null | undefined): T | undefined {
    return (value !== null && value !== undefined) ? value as T : undefined;
}

export function stringToMandatoryEnum<T extends string>(value: string | null | undefined): T {
    if (value === undefined || value === null) { 
        return "" as T;
    }

    return value as T;
}

export function stringArrayToEnumArray<T extends string>(value: string[]): T[] {
    return value as T[];
}
