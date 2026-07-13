import { useEffect } from 'react';

interface SchemaObject {
  [key: string]: any;
}

export function useDocumentMetadata(
  title: string,
  description?: string,
  schema?: SchemaObject
) {
  useEffect(() => {
    // 1. Set Title
    const formattedTitle = title.startsWith('HA CLOTHING')
      ? title
      : `HA CLOTHING — ${title}`;
    document.title = formattedTitle;

    // 2. Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    const defaultDesc = 'Premium streetwear and casual apparel online storefront featuring technical jackets, heavyweight hoodies, and tapered cargos.';
    metaDescription.setAttribute('content', description || defaultDesc);

    // 3. Inject / Update JSON-LD Schema
    if (schema) {
      let scriptTag = document.getElementById('jsonld-schema') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'jsonld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else {
      const scriptTag = document.getElementById('jsonld-schema');
      if (scriptTag) {
        scriptTag.remove();
      }
    }

    return () => {
      // Clean up metadata when component unmounts
      const scriptTag = document.getElementById('jsonld-schema');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [title, description, schema]);
}
