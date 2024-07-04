import React, { useState } from "react";
import Uppy from "@uppy/core";
// @ts-ignore
import Italian from "@uppy/locales/lib/it_IT";
import XHRUpload from "@uppy/xhr-upload";
import { env } from "@/env";
import { Dashboard } from "@uppy/react";
import { UnitTestStep, useUnitTestStore } from "@/app/_stores/unit-test.store";

type Step2GenerateTestsProps = {};

export const Step2GenerateTests = (props: Step2GenerateTestsProps) => {
  const { setStep, setResponse } = useUnitTestStore();

  const [uppy] = useState(() =>
    new Uppy({
      locale: Italian,
      // debug: true,
      id: "Step2GenerateTests",
      allowMultipleUploadBatches: true,
      restrictions: {
        // allowedFileTypes: [
        //   "text/plain",
        //   "application/javascript",
        //   "text/javascript",
        //   "text/x-python",
        //   "text/x-java-source",
        // ],
      },
    }).use(XHRUpload, {
      bundle: true,
      endpoint: `${env.NEXT_PUBLIC_BACKEND_API_URL}/unit-test/generate-tests`,
      fieldName: "files",
      formData: true,
      getResponseData(responseText) {
        const response = JSON.parse(responseText);
        setResponse(response.content.response);
        setStep(UnitTestStep.ShowResults);
      },
    }),
  );

  return (
    <>
      <h1 className="text-white font-bold text-2xl">STEP 2</h1>
      <h2 className="text-xl mb-12 font-base text-zinc-300">
        Carica il file di codice da cui vuoi generare i test automatici qui
        sotto
      </h2>
      <div className="flex flex-wrap p-10">
        <Dashboard
          uppy={uppy}
          height={450}
          theme="dark"
          proudlyDisplayPoweredByUppy={false}
        ></Dashboard>
      </div>
    </>
  );
};
