"use client";
import React, { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TextArea } from "~/components/ui/textarea";
import { STORAGE_KEY } from "~/constants";
import { getItemFromStorage } from "~/lib/storage";
import { RewrittenTextComponent } from "~/components/rewritten-text";
import { HistoryItem, useRewrite } from "~/hooks/useRewrite";
import { HistoryData } from "~/modules/history/components/history-data";
import { InputControls } from "~/modules/controls";
import { useExplain } from "~/hooks/useExplain";
import { downloadHistory } from "~/lib/utils";

const WritingAssistant = () => {
  const [input, setInput] = useState("");
  const [original, setOriginal] = useState("");
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState("same");

  const initialHistory = () =>
    (getItemFromStorage(STORAGE_KEY) as HistoryItem[]) ?? [];

  const { rewrite, isLoading, isSuccess, history, rewritten, onDelete } =
    useRewrite({
      initialHistory: initialHistory(),
    });

  const {
    explain,
    isLoading: isExplanationLoading,
    explanation,
  } = useExplain();

  const handleRewrite = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const payload = {
      content: input,
      tone,
      length,
    };
    setOriginal(input);
    await rewrite(payload);

    setInput("");
  };

  const handleExplain = async () => {
    await explain({ original, rewritten });
  };

  return (
    <div>
      <AnimatePresence presenceAffectsLayout mode='popLayout'>
        <div className='min-h-screen w-fu bg-gray-100 p-4 md:p-8 flex flex-col items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-4xl mx-auto space-y-8 w-full'
          >
            <div className='bg-white rounded-xl w-full'>
              <form className='p-6' onSubmit={handleRewrite}>
                <h1 className='text-2xl font-bold mb-6'>
                  AI Writing Assistant
                </h1>

                <TextArea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                />

                <InputControls
                  length={length}
                  onLengthChange={setLength}
                  onToneChange={setTone}
                  tone={tone}
                  isLoading={isLoading}
                />
              </form>

              <RewrittenTextComponent
                isLoading={isExplanationLoading}
                explanationText={explanation}
                isSuccess={isSuccess}
                text={rewritten}
                onClick={handleExplain}
              />
            </div>

            {history?.length ? (
              <HistoryData
                title='History'
                history={history}
                onDelete={onDelete}
                onDownload={() => downloadHistory(history)}
              />
            ) : null}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default WritingAssistant;
