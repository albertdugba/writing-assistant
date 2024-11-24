import { useState } from "react";
import { STORAGE_KEY } from "~/constants";
import { persistToStorage } from "~/lib/storage";
import { retrieveData } from "~/service";

type RewritePayload = {
  content: string;
  tone: string;
  length: string;
};

export type HistoryItem = {
  text: string;
  timestamp: Date;
};

interface UseRewriteProps {
  initialHistory?: HistoryItem[];
}

export const useRewrite = ({ initialHistory = [] }: UseRewriteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [rewritten, setRewritten] = useState<string>("");

  const updateHistory = (text: string) => {
    const newHistoryItem = { text, timestamp: new Date() };
    const updatedHistory = [...history, newHistoryItem];

    setHistory(updatedHistory);
    persistToStorage(STORAGE_KEY, updatedHistory);
  };

  const onDelete = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    persistToStorage(STORAGE_KEY, updatedHistory);
  };

  const rewrite = async (payload: RewritePayload) => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await retrieveData(payload);
      setRewritten(response.text);
      updateHistory(response.text);

      setIsSuccess(true);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);

      alert(error);
    }
  };

  return {
    rewrite,
    isLoading,
    isSuccess,
    history,
    rewritten,
    onDelete,
  };
};
