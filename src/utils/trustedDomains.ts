import { TrustedDomain } from '../types/scam';

export const trustedDomains: TrustedDomain[] = [

/* ---------- E-COMMERCE ---------- */

{ domain: 'amazon.com', brand: 'Amazon' },
{ domain: 'amazon.in', brand: 'Amazon India' },
{ domain: 'flipkart.com', brand: 'Flipkart' },

/* ---------- INDIAN BANKS ---------- */

{ domain: 'sbi.co.in', brand: 'State Bank of India' },
{ domain: 'onlinesbi.sbi', brand: 'State Bank of India' },
{ domain: 'hdfcbank.com', brand: 'HDFC Bank' },
{ domain: 'icicibank.com', brand: 'ICICI Bank' },
{ domain: 'axisbank.com', brand: 'Axis Bank' },
{ domain: 'kotak.com', brand: 'Kotak Mahindra Bank' },
{ domain: 'yesbank.in', brand: 'Yes Bank' },
{ domain: 'bankofbaroda.in', brand: 'Bank of Baroda' },
{ domain: 'unionbankofindia.co.in', brand: 'Union Bank of India' },
{ domain: 'canarabank.com', brand: 'Canara Bank' },

/* ---------- TELECOM PROVIDERS ---------- */

{ domain: 'airtel.in', brand: 'Airtel' },
{ domain: 'jio.com', brand: 'Reliance Jio' },
{ domain: 'vi.in', brand: 'Vodafone Idea' },

/* ---------- GOVERNMENT ---------- */

{ domain: 'gov.in', brand: 'Government of India' },
{ domain: 'uidai.gov.in', brand: 'UIDAI' },
{ domain: 'epfindia.gov.in', brand: 'EPFO' },
{ domain: 'irctc.co.in', brand: 'IRCTC' },

/* ---------- PAYMENT / UPI ---------- */

{ domain: 'paytm.com', brand: 'Paytm' },
{ domain: 'phonepe.com', brand: 'PhonePe' },
{ domain: 'bhimupi.org.in', brand: 'BHIM UPI' },
{ domain: 'npcil.org.in', brand: 'NPCI' },

/* ---------- GLOBAL TECH ---------- */

{ domain: 'google.com', brand: 'Google' },
{ domain: 'microsoft.com', brand: 'Microsoft' },
{ domain: 'apple.com', brand: 'Apple' },
{ domain: 'netflix.com', brand: 'Netflix' },

/* ---------- SOCIAL MEDIA ---------- */

{ domain: 'facebook.com', brand: 'Facebook' },
{ domain: 'instagram.com', brand: 'Instagram' },
{ domain: 'whatsapp.com', brand: 'WhatsApp' },

/* ---------- APP STORES ---------- */

{ domain: 'play.google.com', brand: 'Google Play' },
{ domain: 'apps.apple.com', brand: 'Apple App Store' },

/* ---------- DELIVERY SERVICES ---------- */

{ domain: 'bluedart.com', brand: 'Blue Dart' },
{ domain: 'delhivery.com', brand: 'Delhivery' },
{ domain: 'indiapost.gov.in', brand: 'India Post' },

];

/* ---------- SUSPICIOUS TLDs ---------- */

export const suspiciousTLDs = [
'.xyz',
'.top',
'.click',
'.pw',
'.tk',
'.ml',
'.ga',
'.cf',
'.gq',
'.work',
'.party',
'.review',
'.trade',
'.win',
'.bid',
'.loan',
'.live',
'.site',
'.online',
'.store',
'.tech',
'.club',
'.space',
'.info',
'.buzz',
'.monster',
'.world',
'.today',
'.finance',
'.digital'
];

/* ---------- URL SHORTENERS ---------- */

export const shortenedUrlDomains = [
'bit.ly',
'tinyurl.com',
't.co',
'goo.gl',
'ow.ly',
'is.gd',
'buff.ly',
'adf.ly',
'short.io',
'rebrand.ly',
'cutt.ly',
'shorturl.at',
'tiny.cc',
'bit.do',
'shorte.st',
'dlvr.it',
'lnkd.in',
'soo.gd',
's2r.co'
];
