import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

interface Props {
  isSuccess: boolean;
  isLoading: boolean;
  text: string;
  onClick: () => void;
  explanationText: string;
}

export function RewrittenTextComponent({
  isLoading,
  isSuccess,
  text,
  onClick,
  explanationText,
}: Props) {
  return (
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          className='border-t bg-gray-50 p-6 rounded-b-xl'
        >
          <div className='flex items-center justify-between mb-2'>
            <h3 className='font-semibold mb-2 text-gray-700'>
              Rewritten Text:
            </h3>

            <Button
              isLoading={isLoading}
              onClick={onClick}
              className='flex items-center px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium'
            >
              Explain
            </Button>
          </div>
          <p className='text-gray-800'>{text}</p>

          {explanationText && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className='w-full h-[1px] bg-gray-300 mt-2' />
              <motion.blockquote layoutId={explanationText} className='mt-3'>
                <em>{explanationText}</em>
              </motion.blockquote>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
