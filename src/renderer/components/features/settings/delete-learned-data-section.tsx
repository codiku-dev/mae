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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/renderer/components/ui/accordion';
import { formatBytesSize } from '@/renderer/libs/utils';

export function DeleteLearnedDataSection() {
  const {
    indexedWebsitesContent,
    setIndexedWebsitesContent,
    deleteIndexedWebsite,
    deleteWebsiteScrapedContent,
  } = useAppStore();
  const { toast } = useToast();

  const handleDeleteAllData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Are you sure you want to delete all learned website data? This action cannot be undone.',
    );

    if (isConfirmed) {
      setIndexedWebsitesContent([]);
      toast({
        title: 'All learned data deleted',
        description: 'All learned website data has been removed.',
      });
    }
  };

  const handleDeleteIndexedWebsite = (url: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete all data for ${url}?`,
    );

    if (isConfirmed) {
      deleteIndexedWebsite(url);
      toast({
        title: 'Indexed website deleted',
        description: `All data for ${url} has been removed.`,
      });
    }
  };

  const handleDeleteScrapedContent = (
    indexedUrl: string,
    scrapedUrl: string,
  ) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the scraped content for ${scrapedUrl}?`,
    );

    if (isConfirmed) {
      deleteWebsiteScrapedContent(indexedUrl, scrapedUrl);
      toast({
        title: 'Scraped content deleted',
        description: `Scraped content for ${scrapedUrl} has been removed.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indexed websites</CardTitle>
      </CardHeader>
      <CardContent>
        {indexedWebsitesContent.map((indexedWebsite, index) => (
          <div className="flex justify-between" key={indexedWebsite.url}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="flex justify-between items-center">
                  <span>{indexedWebsite.url}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {indexedWebsite.scrapedContent.map((content) => (
                      <li
                        key={content.url}
                        className="flex justify-between items-center"
                      >
                        <span className="truncate">{content.url}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {formatBytesSize(content.htmlContent.length)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteScrapedContent(
                                indexedWebsite.url,
                                content.url,
                              );
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex mt-4 ">
              <span className="text-sm text-gray-500 font-semibold mt-4 px-4">
                {formatBytesSize(
                  indexedWebsite.scrapedContent.reduce(
                    (total, content) => total + content.htmlContent.length,
                    0,
                  ),
                )}
              </span>
              <Button
                variant="ghost"
                className="mt-3"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteIndexedWebsite(indexedWebsite.url);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="destructive"
          onClick={handleDeleteAllData}
          className="mt-4 flex items-center space-x-2"
        >
          <Trash className="h-4 w-4" />
          <span>Delete all indexed website data</span>
        </Button>
      </CardContent>
    </Card>
  );
}
