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
import { yesNoUnknownToBoolean } from "@/utils/cast";
import { stringToOptionalEnum } from "@/utils/cast";
import { stringToFloat } from "@/utils/cast";
import { stringToInteger } from "@/utils/cast";
import { YesNoUnknown } from "@/utils/cast";

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
        ageOfChildren:"",
        
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

    caseCategory: null as string | null,
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
            gender: stringToOptionalEnum<Gender>(formValues.victim.gender),
            nationality: stringToOptionalEnum<Nationality>(formValues.victim.nationality),
            isSexualWorker: formValues.victim.isSexualWorker,
            isMissingPerson: formValues.victim.isMissingPerson,
            isNativePeople: formValues.victim.isNativePeople,
            isPregnant: formValues.victim.isPregnant,
            hasDisabillity: formValues.victim.hasDisabillity,
            occupation: formValues.victim.occupation || undefined,
            hasChildren: yesNoUnknownToBoolean(formValues.victim.hasChildren),
            numberOfChildren: (yesNoUnknownToBoolean(formValues.victim.hasChildren))? stringToInteger(formValues.victim.numberOfChildren):undefined,
            ageOfChildren: (yesNoUnknownToBoolean(formValues.victim.hasChildren)) ? formValues.victim.ageOfChildren
                .split("\n")
                .map((s) => s.trim())
                .filter((s) =>  s.length > 0)
                .map((s) => stringToFloat(s))
                .filter((s) => s !== undefined) as number[] : undefined,
        },
        aggressor: {
            fullName: formValues.aggressor.fullName || undefined,
            age: stringToInteger(formValues.aggressor.age),
            gender: stringToOptionalEnum<Gender>(formValues.aggressor.gender),
            hasLegalComplaintHistory: formValues.aggressor.hasLegalComplaintHistory,
            hasPreviousCases: formValues.aggressor.hasPreviousCases,
            wasInPrison: formValues.aggressor.wasInPrison,
            behaviourPostCase: stringToOptionalEnum<AggressorBehaviorPostCase>(formValues.aggressor.behaviourPostCase),
            belongsSecurityForce: formValues.aggressor.belongsSecurityForce,
            securityForce: stringToOptionalEnum<AggressorSecurityForce>(formValues.aggressor.securityForce),
        },
        caseCategory: formValues.caseCategory as CaseCategory,
        occurredAt: formValues.occurredAt.format("YYYY-MM-DD"),
        momentOfDay: stringToOptionalEnum<CaseMomentOfDay>(formValues.momentOfDay),
        wasItAnAttempt: formValues.wasItAnAttempt,
        isInsufficientDataOrUnderInvestigation: formValues.isInsufficientDataOrUnderInvestigation,
        province: formValues.province as Province,
        location: formValues.location,
        geographicLocation: stringToOptionalEnum<CaseGeographicLocation>(formValues.geographicLocation),
        place: formValues.place as CasePlace,
        murderWeapon: stringToOptionalEnum<CaseMurderWeapon>(formValues.murderWeapon),
        wasJudicialized: formValues.wasJudicialized,
        judicialMeasures: (formValues.wasJudicialized)?formValues.judicialMeasures as CaseJudicialMeasure[]: undefined,
        victimBondAggressor: stringToOptionalEnum<CaseVictimBondAggressor>(formValues.victimBondAggressor),
        hadLegalComplaints: formValues.hadLegalComplaints,
        totalLegalComplaints: (formValues.hadLegalComplaints)? stringToInteger(formValues.totalLegalComplaints): undefined,
        isRape: formValues.isRape,
        isRelatedToOrganizedCrime: formValues.isRelatedToOrganizedCrime,
        organizedCrimeNotes: (formValues.isRelatedToOrganizedCrime) ?formValues.organizedCrimeNotes : undefined, // operador ternario (condicion)? if true: if false. Si no quiero que se envie, pongo undefined
        generalNotes: formValues.generalNotes,
        newsLinks: formValues.newsLinks.split("\n").map((s) => s.trim()).filter((s) => s.length > 0),
    };
}
