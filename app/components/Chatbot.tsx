'use client';

import { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
    // This is a placeholder for Tawk.to or any other chatbot script.
    // Replace the src with the actual property ID snippet.
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Uncomment to enable actual chatbot injection when you have an ID
    // document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      // const existingScript = document.querySelector(`script[src="https://embed.tawk.to/YOUR_PROPERTY_ID/default"]`);
      // if (existingScript) {
      //   document.head.removeChild(existingScript);
      // }
    };
  }, []);

  return null;
}
