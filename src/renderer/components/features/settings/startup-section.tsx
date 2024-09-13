import { Checkbox } from '@/renderer/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';

interface StartupSectionProps {
  isLaunchedOnStartup: boolean;
  onLaunchOnStartupChange: (checked: boolean) => void;
}

export const StartupSection = ({
  isLaunchedOnStartup,
  onLaunchOnStartupChange,
}: StartupSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Startup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isLaunchedOnStartup"
            checked={isLaunchedOnStartup}
            onCheckedChange={(checked) =>
              onLaunchOnStartupChange(checked as boolean)
            }
          />
          <label
            htmlFor="isLaunchedOnStartup"
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Launch on startup
          </label>
        </div>
      </CardContent>
    </Card>
  );
};
