import { create } from "zustand";

export enum SyntheticDataStep {
  LoadDataDescription,
  LoadDataDistribution,
  GetClientQuery,
  ShowResults,
}

type SyntheticDataStore = {
  step: SyntheticDataStep;
  setStep: (step: SyntheticDataStep) => void;
  response?: string;
  setResponse: (response?: string) => void;
  clientQuery?: string;
  setClientQuery: (clientQuery?: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSyntheticDataStore = create<SyntheticDataStore>((set) => ({
  step: SyntheticDataStep.LoadDataDescription,
  response: undefined,
  clientQuery: "",
  isLoading: false,
  setStep: (step) => set({ step }),
  setResponse: (response) => set({ response }),
  setClientQuery: (clientQuery) => set({ clientQuery }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
