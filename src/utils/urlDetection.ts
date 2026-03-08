import { suspiciousTLDs, shortenedUrlDomains } from './trustedDomains';

export function extractURLs(text: string): string[] {
  const urlPattern = /(?:https?:\/\/|www\.)[^\s]+/gi;
  const matches = text.match(urlPattern) || [];
  return matches.map(url => url.trim());
}

export function getDomain(url: string): string {
  try {
    let cleanUrl = url;
    if (!url.startsWith('http')) {
      cleanUrl = 'http://' + url;
    }
    const urlObj = new URL(cleanUrl);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function hasSuspiciousTLD(url: string): boolean {
  const domain = getDomain(url);
  return suspiciousTLDs.some(tld => domain.endsWith(tld));
}

export function isShortenedURL(url: string): boolean {
  const domain = getDomain(url);
  return shortenedUrlDomains.some(shortDomain => domain === shortDomain || domain.endsWith(`.${shortDomain}`));
}

export function extractPhoneNumbers(text: string): string[] {
  const phonePattern = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}/g;
  return text.match(phonePattern) || [];
}
