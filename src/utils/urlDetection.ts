import { suspiciousTLDs, shortenedUrlDomains } from './trustedDomains';

/* ---------- URL EXTRACTION ---------- */

export function extractURLs(text: string): string[] {

const urlPattern = /\b((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
const matches = text.match(urlPattern) || [];

return matches
.map(url => url.trim())
.filter(url => url.includes('.'));

}

/* ---------- DOMAIN EXTRACTION ---------- */

export function getDomain(url: string): string {

  try {

    let cleanUrl = url.trim();

    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'http://' + cleanUrl;
    }

    const parsed = new URL(cleanUrl);

    return parsed.hostname.replace(/^www\./, '').toLowerCase();

  } catch {

    return '';

  }

}

/* ---------- SUSPICIOUS TLD CHECK ---------- */

export function hasSuspiciousTLD(url: string): boolean {

const domain = getDomain(url);

return suspiciousTLDs.some(tld =>
domain.endsWith(tld)
);

}

/* ---------- URL SHORTENER CHECK ---------- */

export function isShortenedURL(url: string): boolean {

const domain = getDomain(url);

return shortenedUrlDomains.some(shortDomain =>
domain === shortDomain || domain.endsWith(`.${shortDomain}`)
);

}

/* ---------- PHONE NUMBER EXTRACTION ---------- */

export function extractPhoneNumbers(text: string): string[] {

const phonePattern = /(\+?\d{1,3}[\s-]?)?\d{10}/g;

const matches = text.match(phonePattern) || [];

return matches
.map(num => num.replace(/[^\d+]/g, ''))
.filter(num => num.length >= 10);

}

/* ---------- EMAIL EXTRACTION ---------- */

export function extractEmails(text: string): string[] {

const emailPattern =
/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}\b/i;

const matches = text.match(emailPattern) || [];

return matches.map(email => email.toLowerCase());

}
