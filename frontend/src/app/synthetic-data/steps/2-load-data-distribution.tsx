import React, { useState } from "react";
import Uppy from "@uppy/core";
// @ts-ignore
import Italian from "@uppy/locales/lib/it_IT";
import XHRUpload from "@uppy/xhr-upload";
import { env } from "@/env";
import { Dashboard } from "@uppy/react";
import {
  SyntheticDataStep,
  useSyntheticDataStore,
} from "@/app/_stores/synthetic-data.store";

type Step2LoadDataDistributionProps = {};

export const Step2LoadDataDistribution = (
  props: Step2LoadDataDistributionProps,
) => {
  const { setStep } = useSyntheticDataStore();

  const [uppy] = useState(() =>
    new Uppy({
      locale: Italian,
      // debug: true,
      id: "Step2LoadDataDistribution",
      allowMultipleUploadBatches: true,
      restrictions: {
        allowedFileTypes: ["text/plain"],
      },
    }).use(XHRUpload, {
      bundle: true,
      endpoint: `${env.NEXT_PUBLIC_BACKEND_API_URL}/synthetic-data/load-data-distribution`,
      fieldName: "files",
      formData: true,
    }),
  );

  uppy.on("complete", () => {
    setStep(SyntheticDataStep.GetClientQuery);
  });

  return (
    <>
      <h1 className="text-white font-bold text-2xl">STEP 2</h1>
      <h2 className="text-xl mb-12 font-base text-zinc-300">
        Carica i file che riportano le distribuzioni dei dati qui sotto
      </h2>
      <div className="flex flex-wrap p-10">
        <Dashboard
          uppy={uppy}
          height={450}
          theme="dark"
          proudlyDisplayPoweredByUppy={false}
        ></Dashboard>
      </div>
      <div className="flex flex-col justify-center items-center flex-wrap p-10 gap-6">
        <h1 className="font-semibold">
          Hai già caricato i file indicanti le distribuzioni?
        </h1>
        <button
          className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
          onClick={() => setStep(SyntheticDataStep.GetClientQuery)}
        >
          Vai al prossimo step
        </button>
      </div>
    </>
  );
};
