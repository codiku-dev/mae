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
export const LanguageSelection = (p: {
  currentLanguage: keyof typeof LANGUAGES;
  onChange: (language: keyof typeof LANGUAGES) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assistant language</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          name="assistantLanguage"
          value={p.currentLanguage}
          onValueChange={(value) => {
            p.onChange(value as keyof typeof LANGUAGES);
          }}
        >
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
      </CardContent>
    </Card>
  );
};
