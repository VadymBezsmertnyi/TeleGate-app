import { PurchasesOffering, PurchasesOfferings } from "react-native-purchases";

export enum PurchasesOfferingType {
  ANNUAL = "yearly",
  SEMI_ANNUAL = "half_yearly",
  MONTHLY = "monthly",
}

export type PurchasesNameOfferingType =
  | PurchasesOfferingType.ANNUAL
  | PurchasesOfferingType.SEMI_ANNUAL
  | PurchasesOfferingType.MONTHLY;

export type PurchasesOfferingsType = Omit<PurchasesOfferings, "all"> & {
  all: {
    [PurchasesOfferingType.ANNUAL]: PurchasesOffering;
    [PurchasesOfferingType.SEMI_ANNUAL]: PurchasesOffering;
    [PurchasesOfferingType.MONTHLY]: PurchasesOffering;
  };
};
