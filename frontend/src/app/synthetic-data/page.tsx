"use client";

import React from "react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Step1LoadDataDescription } from "@/app/synthetic-data/steps/1-load-data-description";
import { Step2LoadDataDistribution } from "@/app/synthetic-data/steps/2-load-data-distribution";
import { Step3GetClientQuery } from "@/app/synthetic-data/steps/3-get-client-query";
import { Step4ShowResults } from "@/app/synthetic-data/steps/4-show-results";
import {
  SyntheticDataStep,
  useSyntheticDataStore,
} from "@/app/_stores/synthetic-data.store";

export default function SyntheticDataGeneratorPage() {
  const { step } = useSyntheticDataStore();

  const renderStep = () => {
    switch (step) {
      case SyntheticDataStep.LoadDataDescription:
        return <Step1LoadDataDescription />;
      case SyntheticDataStep.LoadDataDistribution:
        return <Step2LoadDataDistribution />;
      case SyntheticDataStep.GetClientQuery:
        return <Step3GetClientQuery />;
      case SyntheticDataStep.ShowResults:
        return <Step4ShowResults />;
    }
  };

  return (
    <div
      id="synthetic-data"
      className="flex flex-col w-full h-full justify-center items-center"
    >
      <h1 className="text-4xl mb-12 font-semibold">
        Generatore di Dati Sintetici
      </h1>
      {renderStep()}
    </div>
  );
}
