import { motion, AnimatePresence } from "framer-motion";
import { Download, History, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

interface HistoryDataProps {
  title: string;
  history: { text: string; timestamp: Date }[];
  onDelete: (index: number) => void;
  onDownload: () => void;
}

export const HistoryData = (props: HistoryDataProps) => {
  const { history, onDelete, onDownload, title } = props;

  return (
    <div className='bg-white rounded-xl border p-6 h-full flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center'>
          <History className='w-5 h-5 mr-2' />
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>

        <Button
          onClick={onDownload}
          variant='secondary'
          className='flex items-center'
        >
          <Download className='w-4 h-4 mr-2' />
          Download
        </Button>
      </div>

      <div className='flex-grow overflow-y-auto space-y-2'>
        <AnimatePresence initial={false}>
          {history
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='rounded-lg p-4 mb-4 last:mb-0 hover:bg-gray-50 transition-colors'
              >
                <div className='flex justify-between items-center space-x-10'>
                  <p className='flex-grow'>{item.text}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(idx)}
                    className='text-red-500 hover:text-red-700 flex-shrink-0'
                  >
                    <Trash2 className='w-4 h-4' />
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
