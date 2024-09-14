import { Checkbox } from '@/renderer/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

interface StartupSectionProps {
  name: string;
}

export const StartupSection = ({ name }: StartupSectionProps) => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Startup</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isLaunchedOnStartup"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label
                htmlFor="isLaunchedOnStartup"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Launch on startup
              </label>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};
