import React from 'react';
import { Button } from '@/renderer/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/ui/card';
import { useToast } from '@/renderer/hooks/use-toast';
import { Trash } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/renderer/ui/accordion';
import { formatKbSize } from '@/renderer/libs/utils';
import { useSearch } from '@/renderer/hooks/use-search';

export function IndexedWebsiteSection() {
  const {
    indexedWebsitesContent,
    setIndexedWebsitesContent,
    setCurrentSearchSuggestions,
    deleteIndexedWebsite,
    deleteWebsiteScrapedContent,
    getCommands,
  } = useSearch();
  const { toast } = useToast();

  const handleDeleteAllData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Are you sure you want to delete all learned website data? This action cannot be undone.',
    );

    if (isConfirmed) {
      setIndexedWebsitesContent([]);
      window.electron.ipcRenderer.invoke('delete-all-langchain-doc');
      setCurrentSearchSuggestions([])
      toast({
        title: 'All learned data deleted',
        description: 'All learned website data has been removed.',
      });
    }
  };

  const handleDeleteIndexedWebsite = async (url: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete all data for ${url}?`,
    );

    if (isConfirmed) {
      deleteIndexedWebsite(url);
      const docsToDelete = await window.electron.ipcRenderer.invoke('delete-vector-doc', { url: url, partial: true });
      toast({
        title: 'Indexed website deleted',
        description: `All data for ${url} has been removed.`,
      });
    }
  };

  const deleteSubwebsitesDocs = async (
    parentUrl: string,
    childUrl: string,
  ) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the scraped content for ${childUrl}?`,
    );

    if (isConfirmed) {
      const deletedDocs = await window.electron.ipcRenderer.invoke('delete-vector-doc', { url: childUrl, partial: false });
      if (deletedDocs.length > 0) {
        deleteWebsiteScrapedContent(parentUrl, childUrl);
        toast({
          title: 'Scraped content deleted',
          description: `Scraped content for ${childUrl} has been removed.`,
        });
      }
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
                  <span>@{getCommands().find(command => command.url === indexedWebsite.url)?.command} </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {indexedWebsite.subwebsite.map((content) => (
                      <li
                        key={content.url}
                        className="flex justify-between items-center"
                      >
                        <span className="truncate">{content.url}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {formatKbSize(content.sizeKb)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteSubwebsitesDocs(indexedWebsite.url, content.url)

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
                {formatKbSize(
                  indexedWebsite.subwebsite.reduce(
                    (total, content) => total + content.sizeKb,
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
          variant="ghost"
          onClick={handleDeleteAllData}
          className="flex items-center space-x-2 text-red-400 hover:bg-red-300/30 hover:text-red-500"
        >
          <Trash className="h-4 w-4" />
          <span>Delete all indexed website data</span>
        </Button>
      </CardContent>
    </Card>
  );
}
