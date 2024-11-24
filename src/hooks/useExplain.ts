import { useState } from "react";
import { explainTextApi } from "~/service";

type ExplainTextPayload = {
  original: string;
  rewritten: string;
};

export const useExplain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  const explain = async (payload: ExplainTextPayload) => {
    setIsLoading(true);

    try {
      const response = await explainTextApi(payload);

      setIsLoading(false);
      setExplanation(response.text);
      return response;
    } catch (error) {
      alert(error);
    }
  };

  return {
    isLoading,
    explain,
    explanation,
  };
};
