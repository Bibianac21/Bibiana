import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  ogImage?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets document title + meta description/OG tags per page. A lightweight
 * hand-rolled alternative to react-helmet: this app has no server-side
 * rendering, so there's nothing a heavier head-management library buys us.
 */
export default function Seo({ title, description, ogImage }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", window.location.href);
    if (ogImage) setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:card", "summary_large_image");
  }, [title, description, ogImage]);

  return null;
}
