import React from 'react';
import { Button } from '@/renderer/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useToast } from '@/renderer/hooks/use-toast';
import { Trash } from 'lucide-react';

export function DeleteLearnedDataSection() {
  const { setIndexedWebsitesContent } = useAppStore();
  const { toast } = useToast();

  const handleDeleteData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Are you sure you want to delete all learned website data? This action cannot be undone.',
    );

    if (isConfirmed) {
      setIndexedWebsitesContent([]);
      toast({
        title: 'Learned data deleted',
        description: 'All learned website data has been removed.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indexed websites</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          This action will remove all learned website data. This cannot be
          undone.
        </p>
        <Button
          variant="destructive"
          onClick={handleDeleteData}
          className="flex items-center space-x-2"
        >
          <Trash className="h-4 w-4" />
          <span>Delete all indexed website data</span>
        </Button>
      </CardContent>
    </Card>
  );
}
