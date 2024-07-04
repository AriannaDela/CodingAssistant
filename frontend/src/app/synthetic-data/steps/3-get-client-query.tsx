import React from "react";
import {
  SyntheticDataStep,
  useSyntheticDataStore,
} from "@/app/_stores/synthetic-data.store";
import { Rings } from "react-loader-spinner";

type Step3GetClientQueryProps = {};

export const Step3GetClientQuery = (props: Step3GetClientQueryProps) => {
  const {
    setClientQuery,
    setResponse,
    clientQuery,
    setIsLoading,
    isLoading,
    setStep,
  } = useSyntheticDataStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    // Send the client query to the backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/synthetic-data/get-client-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: clientQuery }),
      },
    );

    if (response.ok) {
      const responseJSON = await response.json();
      // Call the onCompleted function with the client query
      setClientQuery();
      setResponse(responseJSON.content.response);
      setStep(SyntheticDataStep.ShowResults);
    } else {
      // Handle the error appropriately
      console.error("Failed to send client query");
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-white font-bold text-2xl">STEP 3</h1>
      <h2 className="text-xl mb-12 font-base text-zinc-300">
        Inserisci una breve descrizione dei dati che vuoi generare:
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-1/2 p-10 gap-6"
      >
        {isLoading && (
          <div className="flex flex-col justify-center items-center gap-8">
            <p>Sto generando i dati...</p>
            <Rings visible={true} height="100" width="100" color="#fff" />
          </div>
        )}
        {!isLoading && (
          <>
            <textarea
              className="w-full p-4 rounded-md text-black"
              placeholder="Descrivi i dati che vuoi generare..."
              value={clientQuery}
              onChange={(e) => setClientQuery(e.target.value)}
              rows={6}
            />
            <button
              type="submit"
              className="bg-zinc-50 text-black px-4 py-2 rounded-md font-semibold mt-4"
            >
              Invia e genera dati!
            </button>
          </>
        )}
      </form>
    </>
  );
};
