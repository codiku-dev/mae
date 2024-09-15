import { v4 as uuidv4 } from 'uuid';
import * as cheerio from 'cheerio';
import { decodeHTML } from 'entities';
import {
  IndexedWebsite,
  WebsiteScrapedContent,
} from '@/renderer/hooks/use-app-store';
import { addProtocolToUrl } from '@/renderer/libs/utils';

interface ControllerEntry {
  id: string;
  controller: AbortController;
}

// @ExposableToRenderer()
export class WebScraperService {
  private static instance: WebScraperService | null = null;
  public static abortControllers: ControllerEntry[] = [];

  public static getInstance(): WebScraperService {
    if (WebScraperService.instance === null) {
      WebScraperService.instance = new WebScraperService();
    }
    return WebScraperService.instance;
  }

  async abortAllRequests() {
    WebScraperService.abortControllers.forEach((entry) => {
      entry.controller.abort();
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    WebScraperService.abortControllers = [];
  }

  removeAbortController(id: string) {
    WebScraperService.abortControllers =
      WebScraperService.abortControllers.filter((entry) => entry.id !== id);
  }

  async fetchSublinks(url_: string): Promise<string[]> {
    const url = addProtocolToUrl(url_);
    try {
      let html = await window.electron.ipcRenderer.invoke(
        'make-http-request',
        url,
      );

      const $ = cheerio.load(html);
      const sublinks: string[] = [];
      const baseUrl = new URL(url);
      const basePath = baseUrl.pathname;

      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href) {
          try {
            const fullUrl = new URL(href, baseUrl);
            if (
              fullUrl.hostname === baseUrl.hostname &&
              fullUrl.href !== url &&
              fullUrl.pathname.startsWith(basePath) &&
              fullUrl.pathname !== basePath
            ) {
              sublinks.push(fullUrl.href);
            }
          } catch (urlError) {
            console.log(`Invalid URL: ${href}`);
          }
        }
      });

      return [...new Set(sublinks)].sort();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('CORS')) {
        console.log(`CORS error when fetching ${url}. Skipping.`);
        return [];
      }
      console.error('Error finding sublinks:', error);
      throw error;
    }
  }
  // keeps only the body of the html and only the node that have text
  async scrapMinimalHtml(url_: string): Promise<string> {
    const url = addProtocolToUrl(url_);
    try {
      // Fetch HTML from the provided URL
      let html = await window.electron.ipcRenderer.invoke(
        'make-http-request',
        url,
      );

      // Load HTML into Cheerio
      const $ = cheerio.load(html);

      // Remove unwanted tags
      $(
        'head, script, style, meta, link, noscript, iframe, object, svg, a',
      ).remove();

      // Optionally remove attributes from tags that are not crucial
      $('*').each((_, el) => {
        for (const attr of (el as any).attributes) {
          $(el).removeAttr(attr.name);
        }
      });

      // remove all empty elements
      $('*').each((_, el) => {
        if ($(el).text().trim() === '') {
          $(el).remove();
        }
      });

      // Remove span tags inside code tags, but keep their content
      $('code').each((_, codeEl) => {
        $(codeEl)
          .find('span')
          .each((_, spanEl) => {
            $(spanEl).replaceWith($(spanEl).contents());
          });
      });

      // Extract content from the body
      const bodyContent = $('body').html(); // or $.root().html() if you want the whole cleaned content

      // Decode HTML entities
      const decodedContent = decodeHTML(bodyContent || '');

      // Return cleaned and decoded HTML, ensuring it's not empty
      return decodedContent.trim();
    } catch (error) {
      console.error('Error scraping HTML:', error);
      return '';
    }
  }

  async fetchWebsiteContent(url_: string): Promise<WebsiteScrapedContent[]> {
    const url = addProtocolToUrl(url_);
    const webpageMinimalHtml = await this.scrapMinimalHtml(url);
    const sublinks = await this.fetchSublinks(url);
    // map
    const sublinkMinimalHtmlPromises = sublinks.map(
      async (sublink): Promise<WebsiteScrapedContent> => {
        const htmlContent = await this.scrapMinimalHtml(sublink);
        return {
          url: sublink,
          htmlContent,
          sizeKb: htmlContent.length / 1024,
        };
      },
    );
    const pagesHTMLContentList = await Promise.all(sublinkMinimalHtmlPromises);
    return [
      {
        url: url,
        htmlContent: webpageMinimalHtml,
        sizeKb: webpageMinimalHtml.length / 1024,
      },
      ...pagesHTMLContentList,
    ];
  }
}

export const webScraperService = WebScraperService.getInstance();
