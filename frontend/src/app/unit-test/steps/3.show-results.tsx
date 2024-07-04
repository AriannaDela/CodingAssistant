import React from "react";
import Markdown from "react-markdown";
import { UnitTestStep, useUnitTestStore } from "@/app/_stores/unit-test.store";

type Step3ShowResultsProps = {};

export const Step3ShowResults = (props: Step3ShowResultsProps) => {
  const { setStep, setResponse, response } = useUnitTestStore();

  return (
    <>
      <h1 className="text-white font-bold text-2xl">STEP 3</h1>
      <h2 className="text-xl mb-12 font-base text-zinc-300">
        I test sono stati generati correttamente
      </h2>
      <div
        className="flex flex-wrap p-10 border-zinc-200 bg-zinc-900 rounded-2xl"
        style={{
          height: "850px",
          overflowY: "scroll",
        }}
      >
        {/*<pre className="text-white">{res}</pre>*/}
        <Markdown className="max-w-5xl flex flex-wrap text-xs">
          {response}
        </Markdown>
      </div>
      <div className="flex flex-wrap p-10 gap-6">
        <button
          className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
          onClick={() => {
            setResponse(undefined);
            setStep(UnitTestStep.GenerateTests);
          }}
        >
          Genera altri test
        </button>
        <button
          className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
          onClick={() => {
            setResponse(undefined);
            setStep(UnitTestStep.LoadDocuments);
          }}
        >
          Carica altri documenti
        </button>
      </div>
    </>
  );
};
