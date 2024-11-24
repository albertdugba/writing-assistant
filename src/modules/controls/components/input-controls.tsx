import { Wand2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Option, SelectInput } from "~/components/ui/select";
import { LENGTH_OPTIONS, TONE_OPTIONS } from "~/constants";

interface InputControlsProps {
  tone: string;
  length: string;
  onToneChange: (value: Option["value"]) => void;
  onLengthChange: (value: Option["value"]) => void;
  isLoading?: boolean;
}

export const InputControls = ({
  tone,
  length,
  onToneChange,
  onLengthChange,
  isLoading,
}: InputControlsProps) => {
  return (
    <div className='flex items-center gap-3 justify-between bg-gray-50 rounded-lg p-4'>
      <div className='flex items-center gap-2'>
        <SelectInput
          testId='tone-select'
          options={TONE_OPTIONS}
          onSelect={onToneChange}
          value={tone}
          className='appearance-none py-1.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />

        <SelectInput
          testId='length-select'
          options={LENGTH_OPTIONS}
          onSelect={onLengthChange}
          value={length}
          className='appearance-none mr-4 py-1.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      <div>
        <Button
          data-testid='rewrite-btn'
          type='submit'
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
