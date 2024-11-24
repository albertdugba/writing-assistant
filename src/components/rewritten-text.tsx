import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isSuccess: boolean;
  isLoading: boolean;
  text: string;
}

export function RewrittenTextComponent({ isSuccess, text }: Props) {
  return (
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          className='border-t bg-gray-50 p-6 rounded-b-xl'
        >
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold mb-2 text-gray-700'>
              Rewritten Text:
            </h3>

            <button className='flex items-center px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium'>
              Explain
            </button>
          </div>
          <p className='text-gray-800'>{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
