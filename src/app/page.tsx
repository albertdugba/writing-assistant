"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { WritingAssistantInput } from "~/modules/text-assistant/components/writing-input";
import { TextArea } from "~/components/ui/textarea";
import { HistoryData } from "~/modules/text-assistant/history/components/history-data";
import { STORAGE_KEY } from "~/constants";
import { getItemFromStorage } from "~/lib/storage";
import { RewrittenTextComponent } from "~/components/rewritten-text";
import { HistoryItem, useRewrite } from "~/hooks/useRewrite";

const WritingAssistant = () => {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState("same");

  const initialHistory = () =>
    (getItemFromStorage(STORAGE_KEY) as HistoryItem[]) ?? [];

  const { rewrite, isLoading, isSuccess, history, rewritten, onDelete } =
    useRewrite({
      initialHistory: initialHistory(),
    });

  const handleRewrite = async () => {
    if (!input.trim()) return;

    const payload = {
      content: input,
      tone,
      length,
    };
    await rewrite(payload);

    setInput("");
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
            <div className='bg-white rounded-xl border w-full'>
              <div className='p-6'>
                <h1 className='text-2xl font-bold mb-6'>
                  AI Writing Assistant
                </h1>

                <TextArea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                />

                <WritingAssistantInput
                  length={length}
                  onClick={handleRewrite}
                  onLengthChange={setLength}
                  onToneChange={setTone}
                  tone={tone}
                  isLoading={isLoading}
                />
              </div>

              <RewrittenTextComponent
                isLoading={isLoading}
                isSuccess={isSuccess}
                text={rewritten}
              />
            </div>

            {history?.length ? (
              <HistoryData
                title='History'
                history={history}
                onDelete={onDelete}
                onDownload={() => {}}
              />
            ) : null}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default WritingAssistant;
