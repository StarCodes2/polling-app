'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PollOptionManagerProps = {
  options: string[];
  onChange: (options: string[]) => void;
  minOptions?: number;
};

export default function PollOptionManager({
  options,
  onChange,
  minOptions = 2,
}: PollOptionManagerProps) {
  const addOption = () => {
    onChange([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length <= minOptions) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    onChange(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onChange(newOptions);
  };

  return (
    <div className="space-y-4">
      <Label>Poll Options</Label>
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
          {options.length > minOptions && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => removeOption(index)}
            >
              ✕
            </Button>
          )}
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addOption}
        className="w-full mt-2"
      >
        Add Option
      </Button>
    </div>
  );
}