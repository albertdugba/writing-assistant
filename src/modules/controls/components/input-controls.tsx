import { Wand2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Option, SelectInput } from "~/components/ui/select";
import { LENGTH_OPTIONS, TONE_OPTIONS } from "~/constants";

interface InputControlsProps {
  tone: string;
  length: string;
  onToneChange: (value: Option["value"]) => void;
  onLengthChange: (value: Option["value"]) => void;
  onClick: () => void;
  isLoading?: boolean;
}

export const InputControls = ({
  tone,
  length,
  onToneChange,
  onLengthChange,
  onClick,
  isLoading,
}: InputControlsProps) => {
  return (
    <div className='flex items-center gap-3 justify-between bg-gray-50 rounded-lg p-2'>
      <div className='flex gap-2'>
        <SelectInput
          options={TONE_OPTIONS}
          onSelect={onToneChange}
          value={tone}
          className='appearance-none py-1.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />

        <SelectInput
          options={LENGTH_OPTIONS}
          onSelect={onLengthChange}
          value={length}
          className='appearance-none mr-4 py-1.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      <div>
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className='flex items-center px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-medium'
          disabled={isLoading}
          isLoading={isLoading}
        >
          <Wand2 className='w-4 h-4 mr-2' />
          Rewrite
        </Button>
      </div>
    </div>
  );
};
