import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  author,
  ogImage,
  ogType = 'article',
  canonical,
  publishedTime,
  modifiedTime
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = `${title} | Orange Tomato`;
    
    // Helper function to set meta tags
    const setMetaTag = (name: string, content: string, isProperty: boolean = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Standard meta tags
    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    if (author) setMetaTag('author', author);
    
    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    if (ogImage) setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'Orange Tomato', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    if (ogImage) setMetaTag('twitter:image', ogImage);
    
    // Article specific tags
    if (ogType === 'article') {
      if (publishedTime) setMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) setMetaTag('article:modified_time', modifiedTime, true);
      if (author) setMetaTag('article:author', author, true);
    }
    
    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
    
    // JSON-LD structured data for better SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': ogType === 'article' ? 'Article' : 'WebPage',
      'headline': title,
      'description': description,
      'author': author ? {
        '@type': 'Person',
        'name': author
      } : undefined,
      'datePublished': publishedTime,
      'dateModified': modifiedTime,
      'image': ogImage,
      'publisher': {
        '@type': 'Organization',
        'name': 'Orange Tomato',
        'logo': {
          '@type': 'ImageObject',
          'url': `${window.location.origin}/logo.png`
        }
      }
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, author, ogImage, ogType, canonical, publishedTime, modifiedTime]);
  
  return null; // This component doesn't render anything
}
