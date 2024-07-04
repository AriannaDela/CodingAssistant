"use client";

import React from "react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Step1LoadDocuments } from "@/app/unit-test/steps/1-load-documents";
import { Step2GenerateTests } from "@/app/unit-test/steps/2-generate-tests";
import { Step3ShowResults } from "@/app/unit-test/steps/3.show-results";
import { UnitTestStep, useUnitTestStore } from "@/app/_stores/unit-test.store";

export default function UnitTestDataGeneratorPage() {
  const { step } = useUnitTestStore();

  const renderStep = () => {
    switch (step) {
      case UnitTestStep.LoadDocuments:
        return <Step1LoadDocuments />;
      case UnitTestStep.GenerateTests:
        return <Step2GenerateTests />;
      case UnitTestStep.ShowResults:
        return <Step3ShowResults />;
    }
  };

  return (
    <div
      id="synthetic-data"
      className="flex flex-col w-full h-full justify-center items-center"
    >
      <h1 className="text-4xl mb-12 font-semibold">Generatore di Unit Test</h1>
      {renderStep()}
    </div>
  );
}
