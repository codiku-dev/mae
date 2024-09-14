import { LANGUAGES } from '@/libs/languages';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/renderer/components/ui/select';
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

interface LanguageSelectionProps {
  name: string;
}

export const LanguageSelection = ({ name }: LanguageSelectionProps) => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistant language</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(LANGUAGES).map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </CardContent>
    </Card>
  );
};
