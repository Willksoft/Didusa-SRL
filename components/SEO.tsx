
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  useEffect(() => {
    // Helper to update or create a meta tag dynamically
    const updateOrCreateMeta = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
        let el = document.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attrName, attrVal);
            document.head.appendChild(el);
        }
        el.setAttribute('content', contentVal);
    };

    // Basic SEO
    document.title = `${title} | Didusa SRL`;
    updateOrCreateMeta('meta[name="description"]', 'name', 'description', description);

    // Open Graph / Facebook
    updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    if (image) {
        updateOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', image);
    }
    if (url) {
        updateOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', url);
    }

    // Twitter
    updateOrCreateMeta('meta[property="twitter:title"]', 'property', 'twitter:title', title);
    updateOrCreateMeta('meta[property="twitter:description"]', 'property', 'twitter:description', description);
    if (image) {
        updateOrCreateMeta('meta[property="twitter:image"]', 'property', 'twitter:image', image);
    }

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
