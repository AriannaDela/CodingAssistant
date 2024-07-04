import { create } from "zustand";

export enum UnitTestStep {
  LoadDocuments,
  GenerateTests,
  ShowResults,
}

type UnitTestStore = {
  step: UnitTestStep;
  setStep: (step: UnitTestStep) => void;
  response?: string;
  setResponse: (response?: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useUnitTestStore = create<UnitTestStore>((set) => ({
  step: UnitTestStep.LoadDocuments,
  response: undefined,
  isLoading: false,
  setStep: (step) => set({ step }),
  setResponse: (response) => set({ response }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
