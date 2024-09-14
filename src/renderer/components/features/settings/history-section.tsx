import { Button } from '@/renderer/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';
import { useToast } from '@/renderer/hooks/use-toast';
import { Trash } from 'lucide-react';
import { useAppStore } from '@/renderer/hooks/use-app-store';
export const HistorySection = () => {
  const { toast } = useToast();
  const { clearAllHistory } = useAppStore();
  const handleDeleteConversationHistory = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Are you sure you want to delete all conversation history? This action cannot be undone.',
    );

    if (isConfirmed) {
      // Implement the actual deletion logic her
      clearAllHistory();
      // Show success toast
      toast({
        title: 'Conversation history deleted',
        description: 'Conversation history has been cleared.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          variant="destructive"
          onClick={handleDeleteConversationHistory}
          className="flex items-center space-x-2"
        >
          <Trash className="h-4 w-4" />
          <span>Delete conversation history</span>
        </Button>
      </CardContent>
    </Card>
  );
};
