
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  useEffect(() => {
    // Basic SEO
    document.title = `${title} | Didusa SRL`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);

    // Open Graph / Facebook
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    if (image) document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
    if (url) document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);

    // Twitter
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
    if (image) document.querySelector('meta[property="twitter:image"]')?.setAttribute('content', image);

    // Canonical
    if (url) {
        let link = document.querySelector('link[rel="canonical"]');
        if (link) {
            link.setAttribute('href', url);
        } else {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', url);
            document.head.appendChild(link);
        }
    }

  }, [title, description, image, url]);

  return null;
};
