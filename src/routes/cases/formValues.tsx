import {
    AggressorBehaviorPostCase,
    AggressorSecurityForce,
    Case,
    CaseCategory,
    CaseMomentOfDay,
    Gender,
    Nationality,
    Province,
    CaseGeographicLocation,
    CasePlace,
    CaseMurderWeapon,
    CaseJudicialMeasure,
    CaseVictimBondAggressor
} from "@/api/aqsnv/cases";
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

type YesNoUnknown = "yes" | "no" | "unknown";

function yesNoUnknownToBoolean(value: YesNoUnknown): boolean | undefined {
    if (value === "yes") {
        return true;
    }

    if (value === "no") {
        return false;
    }

    return undefined;
}

function stringToInteger(value: string): number | undefined {
    const result = parseInt(value);

    if (isNaN(result)) {
        return undefined;
    }

    return result;
}

function stringToEnum<T>(value: string | null | undefined): T | undefined {
    return (value !== null && value !== undefined) ? value as T : undefined;
}

const defaultValues = {
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
    },
    aggressor: {
        fullName: "",
        age: "",
        gender: Gender.HOMBRE as string,
        hasLegalComplaintHistory: false,
        hasPreviousCases: false,
        wasInPrison: false,
        behaviourPostCase: null as string | null,
        belongsSecurityForce: false,
        securityForce: null as string | null,
    },

    caseCategory: CaseCategory.FEMICIDIO_DIRECTO,
    occurredAt: dayjs(),
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
};

export default defaultValues;

export function formValuesToCase(formValues: typeof defaultValues): Case {
    return {
        victim: {
            fullName: formValues.victim.fullName || undefined,
            age: stringToInteger(formValues.victim.age),
            gender: stringToEnum<Gender>(formValues.victim.gender),
            nationality: stringToEnum<Nationality>(formValues.victim.nationality),
            isSexualWorker: formValues.victim.isSexualWorker,
            isMissingPerson: formValues.victim.isMissingPerson,
            isNativePeople: formValues.victim.isNativePeople,
            isPregnant: formValues.victim.isPregnant,
            hasDisabillity: formValues.victim.hasDisabillity,
            occupation: formValues.victim.occupation || undefined,
            hasChildren: yesNoUnknownToBoolean(formValues.victim.hasChildren),
            numberOfChildren: stringToInteger(formValues.victim.numberOfChildren),
        },
        aggressor: {
            fullName: formValues.aggressor.fullName || undefined,
            age: stringToInteger(formValues.aggressor.age),
            gender: stringToEnum<Gender>(formValues.aggressor.gender),
            hasLegalComplaintHistory: formValues.aggressor.hasLegalComplaintHistory,
            hasPreviousCases: formValues.aggressor.hasPreviousCases,
            wasInPrison: formValues.aggressor.wasInPrison,
            behaviourPostCase: stringToEnum<AggressorBehaviorPostCase>(formValues.aggressor.behaviourPostCase),
            belongsSecurityForce: formValues.aggressor.belongsSecurityForce,
            securityForce: stringToEnum<AggressorSecurityForce>(formValues.aggressor.securityForce),
        },
        caseCategory: stringToEnum<CaseCategory>(formValues.caseCategory),
        occurredAt: formValues.occurredAt.format("YYYY-MM-DD"),
        momentOfDay: stringToEnum<CaseMomentOfDay>(formValues.momentOfDay),
        wasItAnAttempt: formValues.wasItAnAttempt,
        isInsufficientDataOrUnderInvestigation: formValues.isInsufficientDataOrUnderInvestigation,
        province: formValues.province as Province,
        location: formValues.location,
        geographicLocation: stringToEnum<CaseGeographicLocation>(formValues.geographicLocation),
        place: formValues.place as CasePlace,
        murderWeapon: stringToEnum<CaseMurderWeapon>(formValues.murderWeapon),
        hadLegalComplaints: formValues.hadLegalComplaints,
        wasJudicialized: formValues.wasJudicialized,
        judicialMeasures: formValues.judicialMeasures as CaseJudicialMeasure[],
        victimBondAggressor: stringToEnum<CaseVictimBondAggressor>(formValues.victimBondAggressor),
        totalLegalComplaints: stringToInteger(formValues.aggressor.totalLegalComplaints),
        isRape: formValues.isRape,
        isRelatedToOrganizedCrime: formValues.isRelatedToOrganizedCrime,
        organizedCrimeNotes: formValues.organizedCrimeNotes,
        generalNotes: formValues.generalNotes,
        newsLinks: formValues.newsLinks.split("\n").map((s) => s.trim()).filter((s) => s.length > 0),
    };
}
