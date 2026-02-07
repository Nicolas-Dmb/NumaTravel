import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string; 
};

export default function SEO({ title, description, canonicalPath }: SEOProps) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `${window.location.origin}${canonicalPath}`;
    }
  }, [title, description, canonicalPath]);

  return null;
}
