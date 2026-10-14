/**
 * Normalizes user-provided image host links into direct, embeddable image URLs.
 * Handles ImgBB, PostImages, Google Drive, Dropbox, Imgur, iili.io / FreeImage, device uploads, etc.
 */
export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  let clean = url.trim();

  // Strip BBCode [img]...[/img] or [url]...[/url]
  const bbMatch = clean.match(/\[img\](.*?)\[\/img\]/i);
  if (bbMatch && bbMatch[1]) {
    clean = bbMatch[1].trim();
  }
  const bbUrlMatch = clean.match(/\[url=(.*?)\]/i);
  if (bbUrlMatch && bbUrlMatch[1] && !clean.startsWith('http')) {
    clean = bbUrlMatch[1].trim();
  }

  // If wrapped in HTML tags or src="..."
  const srcMatch = clean.match(/src=["'](.*?)["']/i);
  if (srcMatch && srcMatch[1]) {
    clean = srcMatch[1].trim();
  }
  const hrefMatch = clean.match(/href=["'](.*?)["']/i);
  if (!clean.startsWith('http') && hrefMatch && hrefMatch[1]) {
    clean = hrefMatch[1].trim();
  }
  clean = clean.replace(/^["']|["']$/g, '');

  // Google Drive sharing links
  const gdriveMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gdriveMatch[1]}`;
  }
  const gdriveIdMatch = clean.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/i);
  if (gdriveIdMatch && gdriveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gdriveIdMatch[1]}`;
  }

  // Dropbox share links
  if (clean.includes('dropbox.com')) {
    return clean.replace(/[?&]dl=0/, '?raw=1').replace(/\?dl=1/, '?raw=1');
  }

  // Imgur gallery or page link -> direct image
  if (clean.includes('imgur.com/') && !clean.includes('i.imgur.com/')) {
    const imgurMatch = clean.match(/imgur\.com\/([a-zA-Z0-9]+)$/);
    if (imgurMatch && imgurMatch[1]) {
      return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
    }
  }

  // If local /uploads path, handle base path for GitHub Pages or preview
  if (clean.startsWith('/uploads/')) {
    // Return relative path so it resolves correctly on static subdirectories
    return `.${clean}`;
  }

  return clean;
}

/**
 * Async resolver that asks the backend server to resolve viewer pages
 * (e.g., ibb.co/XYZ or ibb.co.com/XYZ, postimg.cc/XYZ) into the real direct CDN image.
 */
export async function resolveAndNormalizeImageUrl(url: string | undefined | null): Promise<string> {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return '';

  // Check if it's an unresolved viewer page (e.g. ibb.co or ibb.co.com or postimg.cc)
  const isViewerPage =
    (/(?:ibb\.co|ibb\.co\.com)\/[a-zA-Z0-9]+/i.test(normalized) && !normalized.includes('i.ibb.co/')) ||
    (/postimg\.cc\/[a-zA-Z0-9]+/i.test(normalized) && !normalized.includes('i.postimg.cc/'));

  if (isViewerPage) {
    try {
      const res = await fetch(`/api/resolve-image?url=${encodeURIComponent(normalized)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.directUrl && data.directUrl.startsWith('http')) {
          return data.directUrl;
        }
      }
    } catch {
      // Return normalized as fallback
    }
  }

  return normalized;
}
