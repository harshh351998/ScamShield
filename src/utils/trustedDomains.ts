import { TrustedDomain } from '../types/scam';

export const trustedDomains: TrustedDomain[] = [
  { domain: 'amazon.com', brand: 'Amazon' },
  { domain: 'amazon.in', brand: 'Amazon India' },
  { domain: 'flipkart.com', brand: 'Flipkart' },
  { domain: 'sbi.co.in', brand: 'State Bank of India' },
  { domain: 'onlinesbi.sbi', brand: 'State Bank of India' },
  { domain: 'hdfcbank.com', brand: 'HDFC Bank' },
  { domain: 'icicibank.com', brand: 'ICICI Bank' },
  { domain: 'licindia.in', brand: 'LIC India' },
  { domain: 'gov.in', brand: 'Government of India' },
  { domain: 'uidai.gov.in', brand: 'UIDAI' },
  { domain: 'epfindia.gov.in', brand: 'EPFO' },
  { domain: 'irctc.co.in', brand: 'IRCTC' },
  { domain: 'paytm.com', brand: 'Paytm' },
  { domain: 'phonepe.com', brand: 'PhonePe' },
  { domain: 'google.com', brand: 'Google' },
];

export const suspiciousTLDs = [
  '.xyz', '.top', '.click', '.pw', '.tk', '.ml', '.ga', '.cf', '.gq',
  '.work', '.party', '.review', '.trade', '.win', '.bid', '.loan'
];

export const shortenedUrlDomains = [
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd',
  'buff.ly', 'adf.ly', 'short.io', 'rebrand.ly'
];
