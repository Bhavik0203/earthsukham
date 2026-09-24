'use client';

import { useEffect } from 'react';
import { 
  dummyProperties, 
  dummyCareers, 
  dummySavedProperties, 
  dummyComparisons, 
  dummyBuilders, 
  dummyPressReleases, 
  dummyBlogs 
} from '../lib/dummyData';

export default function DummyDataInterceptor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).__fetchIntercepted) {
      const originalFetch = window.fetch;
      (window as any).__fetchIntercepted = true;

      window.fetch = async (...args) => {
        try {
          const response = await originalFetch(...args);
          // If the response is not OK, we intentionally throw to trigger the dummy fallback
          if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
          }
          return response;
        } catch (error) {
          console.warn('Fetch failed, using dummy data for', args[0]);
          
          let url = '';
          if (typeof args[0] === 'string') url = args[0];
          else if (args[0] && (args[0] as Request).url) url = (args[0] as Request).url;

          // Default dummy JSON based on URL
          let dummyData: any = { success: true };

          if (url.includes('/properties')) {
             if (url.includes('/saved-properties')) {
                 dummyData.savedProperties = dummySavedProperties;
                 dummyData.data = dummySavedProperties;
             } else if (url.includes('/property-comparisons')) {
                 dummyData.comparisons = dummyComparisons;
                 dummyData.data = dummyComparisons;
             } else {
                 dummyData.properties = dummyProperties;
                 dummyData.data = dummyProperties;
                 // Mock for single property as well if it ends with slug
                 if (url.includes('/slug/')) {
                     dummyData.property = dummyProperties[0];
                     dummyData.data = dummyProperties[0];
                 }
             }
          } else if (url.includes('/careers')) {
             dummyData.careers = dummyCareers;
             dummyData.data = dummyCareers;
          } else if (url.includes('/builders')) {
             dummyData.builders = dummyBuilders;
             dummyData.data = dummyBuilders;
          } else if (url.includes('/press-releases')) {
             dummyData.pressReleases = dummyPressReleases;
             dummyData.data = dummyPressReleases;
          } else if (url.includes('/blogs')) {
             dummyData.blogs = dummyBlogs;
             dummyData.data = dummyBlogs;
          }

          // Return a mocked successful response
          return new Response(JSON.stringify(dummyData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      };
    }
  }, []);

  return null;
}
