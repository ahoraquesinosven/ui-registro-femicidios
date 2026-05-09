import {
    Aggressor,
    AggressorBehaviorPostCase,
    AggressorSecurityForce,
    Case,
    CaseCategory,
    CaseGeographicLocation,
    CaseJudicialMeasure,
    CaseMomentOfDay,
    CaseMurderWeapon,
    CasePlace,
    CaseVictimBondAggressor,
    Gender,
    Nationality,
    Province,
    Victim
} from "@/api/aqsnv/cases";
import {
    stringArrayToEnumArray,
    stringToFloat,
    stringToInteger,
    stringToMandatoryEnum,
    stringToOptionalEnum,
    YesNoUnknown,
    yesNoUnknownToBoolean,
    booleanToYesNoUnknown
} from "@/utils/cast";
import dayjs from "dayjs";

export const allGenders = Object.values(Gender);
export const allNationalities = Object.values(Nationality);
export const allAggressorBehaviorsPostCase = Object.values(AggressorBehaviorPostCase);
export const allAggressorSecurityForces = Object.values(AggressorSecurityForce);
export const allMomentsOfDay = Object.values(CaseMomentOfDay);
export const allProvinces = Object.values(Province);
export const allCaseGeographicLocations = Object.values(CaseGeographicLocation);
export const allCasePlaces = Object.values(CasePlace);
export const allCaseMurderWeapons = Object.values(CaseMurderWeapon);
export const allCaseJudicialMeasures = Object.values(CaseJudicialMeasure);
export const allCaseVictimBondsAggressor = Object.values(CaseVictimBondAggressor);
export const allCaseCategories = Object.values(CaseCategory);

export const defaultFormValues = {
    victim: {
        fullName: "",
        age: "",
        gender: Gender.MUJER as string,
        nationality: null as string | null,
        isSexualWorker: false,
        isMissingPerson: false,
        isNativePeople: false,
        isPregnant: false,
        hasDisabillity: false,
        occupation: "",
        hasChildren: "unknown" as YesNoUnknown,
        numberOfChildren: "",
        ageOfChildren: "",

    },
    aggressor: {
        fullName: "",
        age: "",
        gender: Gender.HOMBRE as string,
        hasLegalComplaintHistory: false,
        hasPreviousCases: false,
        wasInPrison: false,
        behaviourPostCase: [] as string[],
        belongsSecurityForce: false,
        securityForce: null as string | null,
    },

    caseCategory: null as string | null,
    occurredAt: dayjs().utc(),
    momentOfDay: null as string | null,
    wasItAnAttempt: false,
    isInsufficientDataOrUnderInvestigation: false,
    totalLegalComplaints: "",
    province: null as string | null,
    location: "",
    geographicLocation: null as string | null,
    place: null as string | null,
    murderWeapon: null as string | null,
    wasJudicialized: false,
    judicialMeasures: [] as string[],
    hadLegalComplaints: false,
    isRape: false,
    isRelatedToOrganizedCrime: false,
    victimBondAggressor: null as string | null,
    organizedCrimeNotes: "",
    generalNotes: "",
    newsLinks: "",
    hasMediaGenderPerspective: "unknown" as YesNoUnknown,
    coverageMediaPerspectiveNotes: "",
};

function parseVictimAgeOfChildren(value: string): number[] {
    return value
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((s) => stringToFloat(s))
        .filter((s) => s !== undefined) as number[];
}

function victimValuestoVictim(values: typeof defaultFormValues.victim): Victim {
    const hasChildren = yesNoUnknownToBoolean(values.hasChildren);

    return {
        fullName: values.fullName || undefined,
        age: stringToInteger(values.age),
        gender: stringToOptionalEnum(values.gender),
        nationality: stringToOptionalEnum(values.nationality),
        isSexualWorker: values.isSexualWorker,
        isMissingPerson: values.isMissingPerson,
        isNativePeople: values.isNativePeople,
        isPregnant: values.isPregnant,
        hasDisabillity: values.hasDisabillity,
        occupation: values.occupation || undefined,
        hasChildren: hasChildren,
        numberOfChildren: hasChildren ? stringToInteger(values.numberOfChildren) : undefined,
        ageOfChildren: hasChildren ? parseVictimAgeOfChildren(values.ageOfChildren) : undefined,
    };
}

function aggressorValuesToAggressor(values: typeof defaultFormValues.aggressor): Aggressor {
    const belongsSecurityForce = values.belongsSecurityForce;
    return {
        fullName: values.fullName || undefined,
        age: stringToInteger(values.age),
        gender: stringToOptionalEnum(values.gender),
        hasLegalComplaintHistory: values.hasLegalComplaintHistory,
        hasPreviousCases: values.hasPreviousCases,
        wasInPrison: values.wasInPrison,
        behaviourPostCase: stringArrayToEnumArray(values.behaviourPostCase),
        belongsSecurityForce: belongsSecurityForce,
        securityForce: belongsSecurityForce ? stringToOptionalEnum(values.securityForce) : undefined,
    };
}

function parseNewsLinks(value: typeof defaultFormValues.newsLinks): string[] {
    return value
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
}

export function formValuesToCase(values: typeof defaultFormValues): Case {
    const wasJudicialized = values.wasJudicialized;
    const hadLegalComplaints = values.hadLegalComplaints;
    const isRelatedToOrganizedCrime = values.isRelatedToOrganizedCrime;
    const hasMediaGenderPerspective = yesNoUnknownToBoolean(values.hasMediaGenderPerspective);

    return {
        victim: victimValuestoVictim(values.victim),
        aggressor: aggressorValuesToAggressor(values.aggressor),

        caseCategory: stringToMandatoryEnum(values.caseCategory),
        occurredAt: values.occurredAt.format("YYYY-MM-DD"),
        momentOfDay: stringToOptionalEnum(values.momentOfDay),
        wasItAnAttempt: values.wasItAnAttempt,
        isInsufficientDataOrUnderInvestigation: values.isInsufficientDataOrUnderInvestigation,
        province: stringToMandatoryEnum(values.province),
        location: values.location,
        geographicLocation: stringToOptionalEnum(values.geographicLocation),
        place: stringToMandatoryEnum(values.place),
        murderWeapon: stringToOptionalEnum(values.murderWeapon),
        wasJudicialized: wasJudicialized,
        judicialMeasures: wasJudicialized ? stringArrayToEnumArray(values.judicialMeasures) : undefined,
        victimBondAggressor: stringToOptionalEnum(values.victimBondAggressor),
        hadLegalComplaints: hadLegalComplaints,
        totalLegalComplaints: hadLegalComplaints ? stringToInteger(values.totalLegalComplaints) : undefined,
        isRape: values.isRape,
        isRelatedToOrganizedCrime: isRelatedToOrganizedCrime,
        organizedCrimeNotes: isRelatedToOrganizedCrime ? values.organizedCrimeNotes : undefined,
        generalNotes: values.generalNotes,
        newsLinks: parseNewsLinks(values.newsLinks),
        hasMediaGenderPerspective: hasMediaGenderPerspective,
        coverageMediaPerspectiveNotes: values.coverageMediaPerspectiveNotes,
    };
}

function victimToVictimValues(value: Victim): typeof defaultFormValues.victim {
    return {
        fullName: value.fullName || "",
        age: value.age?.toString() || "",
        gender: value.gender || "",
        nationality: value.nationality || null,
        isSexualWorker: value.isSexualWorker || false,
        isMissingPerson: value.isMissingPerson || false,
        isNativePeople: value.isNativePeople || false,
        isPregnant: value.isPregnant || false,
        hasDisabillity: value.hasDisabillity || false,
        occupation: value.occupation || "",
        hasChildren: booleanToYesNoUnknown(value.hasChildren),
        numberOfChildren: value.numberOfChildren?.toString() || "",
        ageOfChildren: value.ageOfChildren?.join(", ") || "",
    };
}

function aggressorToAggressorValues(value: Aggressor): typeof defaultFormValues.aggressor {
    return {
        fullName: value.fullName || "",
        age: value.age?.toString() || "",
        gender: value.gender || "",
        hasLegalComplaintHistory: value.hasLegalComplaintHistory || false,
        hasPreviousCases: value.hasPreviousCases || false,
        wasInPrison: value.wasInPrison || false,
        behaviourPostCase: value.behaviourPostCase || [],
        belongsSecurityForce: value.belongsSecurityForce || false,
        securityForce: value.securityForce || null,
    };
}

export function caseToFormValues(value: Case): typeof defaultFormValues {
    return {
        victim: victimToVictimValues(value.victim),
        aggressor: aggressorToAggressorValues(value.aggressor),

        caseCategory: value.caseCategory,
        occurredAt: dayjs(value.occurredAt).utc(),
        momentOfDay: value.momentOfDay || null,
        wasItAnAttempt: value.wasItAnAttempt || false,
        isInsufficientDataOrUnderInvestigation: value.isInsufficientDataOrUnderInvestigation || false,
        totalLegalComplaints: value.totalLegalComplaints?.toString() || "",
        province: value.province,
        location: value.location || "",
        geographicLocation: value.geographicLocation || null,
        place: value.place || null,
        murderWeapon: value.murderWeapon || null,
        wasJudicialized: value.wasJudicialized || false,
        judicialMeasures: value.judicialMeasures || [],
        hadLegalComplaints: value.hadLegalComplaints || false,
        isRape: value.isRape || false,
        victimBondAggressor: value.victimBondAggressor || null,
        isRelatedToOrganizedCrime: value.isRelatedToOrganizedCrime || false,
        organizedCrimeNotes: value.organizedCrimeNotes || "",
        generalNotes: value.generalNotes || "",
        newsLinks: value.newsLinks.join("\n"),
        hasMediaGenderPerspective: booleanToYesNoUnknown(value.hasMediaGenderPerspective),
        coverageMediaPerspectiveNotes: value.coverageMediaPerspectiveNotes || "",
    };
}
