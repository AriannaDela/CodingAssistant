import React from "react";
import Markdown from "react-markdown";
import {
  SyntheticDataStep,
  useSyntheticDataStore,
} from "@/app/_stores/synthetic-data.store";

type Step4ShowResultsProps = {};

export const Step4ShowResults = (props: Step4ShowResultsProps) => {
  const { setStep, setResponse, response } = useSyntheticDataStore();
  return (
    <>
      <h1 className="text-white font-bold text-2xl">STEP 4</h1>
      <h2 className="text-xl mb-12 font-base text-zinc-300">
        I dati sintetici sono stati generati correttamente
      </h2>
      <div
        className="flex flex-wrap p-10 border-zinc-200 bg-zinc-900 rounded-2xl"
        style={{
          height: "850px",
          overflowY: "scroll",
        }}
      >
        <pre className="max-w-5xl flex flex-wrap text-xs">{response}</pre>
        {/*<Markdown className="max-w-5xl flex flex-wrap text-xs">*/}
        {/*  {response}*/}
        {/*</Markdown>*/}
      </div>
      <div className="flex flex-wrap p-10 gap-6">
        <button
          className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
          onClick={() => {
            setResponse(undefined);
            setStep(SyntheticDataStep.GetClientQuery);
          }}
        >
          Genera altri dati sintetici
        </button>
        <button
          className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
          onClick={() => {
            setResponse(undefined);
            setStep(SyntheticDataStep.LoadDataDescription);
          }}
        >
          Carica altri documenti
        </button>
        <button
          className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
          onClick={() => {
            setResponse(undefined);
            setStep(SyntheticDataStep.LoadDataDistribution);
          }}
        >
          Carica altre distribuzioni
        </button>
      </div>
    </>
  );
};
