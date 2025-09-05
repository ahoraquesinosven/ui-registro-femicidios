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

type YesNoUnknown = "yes" | "no" | "unknown";

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

    occurredAt: dayjs(),
    momentOfDay: null as string | null,
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
    organizedCrimeNotes: "",
    generalNotes: "",
    newsLinks: "",
};

export default defaultValues;

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

export function formValuesToCase(formValues: typeof defaultValues): Case {
    return {
        victim: {
            fullName: formValues.victim.fullName,
            age: stringToInteger(formValues.victim.age),
            gender: formValues.victim.gender as Gender,
            nationality: formValues.victim.nationality as Nationality,
            isSexualWorker: formValues.victim.isSexualWorker,
            isMissingPerson: formValues.victim.isMissingPerson,
            isNativePeople: formValues.victim.isNativePeople,
            isPregnant: formValues.victim.isPregnant,
            hasDisabillity: formValues.victim.hasDisabillity,
            occupation: formValues.victim.occupation,
            hasChildren: yesNoUnknownToBoolean(formValues.victim.hasChildren),
            numberOfChildren: stringToInteger(formValues.victim.numberOfChildren),
        },
        aggressor: {
            fullName: formValues.aggressor.fullName,
            age: stringToInteger(formValues.aggressor.age),
            gender: formValues.aggressor.gender as Gender,
            hasLegalComplaintHistory: formValues.aggressor.hasLegalComplaintHistory,
            hasPreviousCases: formValues.aggressor.hasPreviousCases,
            wasInPrison: formValues.aggressor.wasInPrison,
            behaviourPostCase: formValues.aggressor.behaviourPostCase as AggressorBehaviorPostCase,
            belongsSecurityForce: formValues.aggressor.belongsSecurityForce,
            securityForce: formValues.aggressor.securityForce as AggressorSecurityForce,
        },
        category: CaseCategory.FEMICIDIO_DIRECTO,
        occurredAt: formValues.occurredAt.toISOString(),
        momentOfDay: formValues.momentOfDay as CaseMomentOfDay,
        province: formValues.province as Province,
        location: formValues.location,
        geographicLocation: formValues.geographicLocation as CaseGeographicLocation,
        place: formValues.place as CasePlace,
        murderWeapon: formValues.murderWeapon as CaseMurderWeapon,
        hadLegalComplaints: formValues.hadLegalComplaints,
        wasJudicialized: formValues.wasJudicialized,
        judicialMeasures: formValues.judicialMeasures as CaseJudicialMeasure[],
        // victimBondAggressor: formValues.victimBondAggressor,
        isRape: formValues.isRape,
        isRelatedToOrganizedCrime: formValues.isRelatedToOrganizedCrime,
        organizedCrimeNotes: formValues.organizedCrimeNotes,
        generalNotes: formValues.generalNotes,
        // newsLinks: formValues.newsLinks,
    };
}
