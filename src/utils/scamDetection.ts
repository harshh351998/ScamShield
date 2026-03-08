import { ScamAnalysisResult } from '../types/scam';
import { extractURLs, getDomain, hasSuspiciousTLD, isShortenedURL, extractPhoneNumbers } from './urlDetection';
import { trustedDomains } from './trustedDomains';

const urgencyKeywords = [
  'urgent', 'immediately', 'act now', 'today only', 'expires today',
  'last chance', 'limited time', 'hurry', 'quick', 'fast', 'now',
  'तुरंत', 'अभी', 'जल्दी'
];

const fearKeywords = [
  'blocked', 'suspended', 'terminated', 'legal action', 'court',
  'arrest', 'penalty', 'fine', 'police', 'lawsuit',
  'बंद', 'रोक', 'कानूनी'
];

const paymentKeywords = [
  'payment', 'pay', 'fee', 'charge', 'amount', 'rupees', 'rs', 'inr',
  'delivery fee', 'verification fee', 'registration fee',
  'google pay', 'phonepe', 'paytm', 'cred', 'upi', 'gpay',
  'भुगतान', 'पैसे', 'रुपये'
];

const sensitiveDataKeywords = [
  'otp', 'one time password', 'verification code', 'pin', 'password',
  'cvv', 'card number', 'account number', 'aadhaar', 'aadhar', 'pan',
  'bank details', 'atm pin', 'debit card', 'credit card',
  'ओटीपी', 'पासवर्ड', 'आधार', 'पैन'
];

const verifyKeywords = [
  'verify', 'update', 'confirm', 'validate', 'authenticate',
  'kyc', 'know your customer', 'सत्यापित', 'अपडेट'
];

const rewardKeywords = [
  'won', 'winner', 'prize', 'lottery', 'reward', 'cashback',
  'guaranteed', 'profit', 'earn money', 'जीता', 'इनाम'
];

const cryptoKeywords = [
  'bitcoin', 'btc', 'ethereum', 'eth', 'usdt', 'usdc', 'cryptocurrency',
  'crypto', 'blockchain', 'wallet', 'mining', 'nft', 'altcoin',
  'बिटकॉइन', 'क्रिप्टो', 'माइनिंग'
];

const investmentScamKeywords = [
  'daily returns', 'guaranteed profit', 'guaranteed returns', 'high returns',
  'easy money', 'passive income', 'earn fast', 'investment program',
  'mining pool', 'trading bot', 'trading signals', 'forex', 'mlm',
  'pyramid', 'doubling', 'double your money', 'roi', 'return on investment',
  'limited slots', 'limited positions', 'exclusive opportunity',
  'दैनिक रिटर्न', 'गारंटीड लाभ', 'आसान पैसा', 'निष्क्रिय आय'
];

const percentagePattern = /(\d+\s*%\s*(daily|hourly|weekly|monthly|per\s*day|return))/i;

export function analyzeMessage(text: string, urlInput?: string): ScamAnalysisResult {
  const indicators: string[] = [];
  const sensitiveData: string[] = [];
  const psychologyTactics: string[] = [];
  const reasons: string[] = [];
  const safeIndicators: string[] = [];
  let riskScore = 0;
  let scamType = 'None detected';
  let indicatorCount = 0;

  const lowerText = text.toLowerCase();
  const urls = extractURLs(text);
  if (urlInput) {
    urls.push(urlInput);
  }

  const hasUrgency = urgencyKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasFear = fearKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasPayment = paymentKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasSensitiveData = sensitiveDataKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasVerify = verifyKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasReward = rewardKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasCrypto = cryptoKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasInvestmentScamKeywords = investmentScamKeywords.some(kw => lowerText.includes(kw.toLowerCase()));
  const hasHighReturns = percentagePattern.test(text);
  const phones = extractPhoneNumbers(text);
  let hasSuspiciousLink = false;

  if (urls.length > 0) {
    urls.forEach(url => {
      const domain = getDomain(url);

      if (isShortenedURL(url)) {
        indicators.push('Shortened URL detected');
        riskScore += 15;
        indicatorCount++;
        reasons.push('Message contains shortened URL which may hide the real destination');
        hasSuspiciousLink = true;
      }

      if (hasSuspiciousTLD(url)) {
        indicators.push('Suspicious domain extension');
        riskScore += 20;
        indicatorCount++;
        reasons.push('URL uses suspicious domain extension commonly used by scammers');
        hasSuspiciousLink = true;
      }

      const isTrusted = trustedDomains.some(td => domain.includes(td.domain));
      if (!isTrusted) {
        if (hasSensitiveData || hasPayment || hasVerify) {
          indicators.push('Untrusted domain with suspicious request');
          riskScore += 25;
          indicatorCount++;
          reasons.push('Unverified website requesting sensitive information, payment, or verification');
          hasSuspiciousLink = true;
        } else {
          indicators.push('Suspicious link detected');
          riskScore += 10;
          indicatorCount++;
          reasons.push('Link from unverified domain');
          hasSuspiciousLink = true;
        }
      } else {
        safeIndicators.push(`Link belongs to verified domain: ${domain}`);
      }
    });
  }

  if (hasSensitiveData) {
    const detectedData = sensitiveDataKeywords.filter(kw =>
      lowerText.includes(kw.toLowerCase())
    );
    sensitiveData.push(...detectedData);
    indicators.push('Requests sensitive information');
    riskScore += 30;
    indicatorCount++;
    reasons.push('Message asks for sensitive information like OTP, PIN, or bank details');

    if (detectedData.some(d => d.toLowerCase().includes('otp'))) {
      scamType = 'OTP Scam';
    } else if (detectedData.some(d => ['aadhaar', 'aadhar', 'pan'].includes(d.toLowerCase()))) {
      scamType = 'Data Harvesting Scam';
    } else {
      scamType = 'Bank Scam';
    }
  }

  if (hasPayment) {
    indicators.push('Payment request detected');
    riskScore += 25;
    indicatorCount++;
    reasons.push('Message requests payment or mentions payment platforms');

    if (lowerText.includes('delivery') || lowerText.includes('parcel') || lowerText.includes('courier')) {
      if (scamType === 'None detected') {
        scamType = 'Delivery Scam';
      }
    } else if (scamType === 'None detected') {
      scamType = 'Bank Scam';
    }
  }

  if (hasUrgency) {
    psychologyTactics.push('Urgency');
    indicators.push('Uses urgency tactics');
    riskScore += 15;
    indicatorCount++;
    reasons.push('Creates false sense of urgency to pressure quick action');
  }

  if (hasFear) {
    psychologyTactics.push('Fear');
    indicators.push('Uses fear tactics');
    riskScore += 20;
    indicatorCount++;
    reasons.push('Uses threats or fear tactics like account blocking or legal action');
  }

  if (hasReward) {
    psychologyTactics.push('Greed');
    indicators.push('Promises unrealistic rewards');
    riskScore += 20;
    indicatorCount++;
    reasons.push('Promises unrealistic prizes, rewards, or guaranteed profits');

    if (scamType === 'None detected') {
      scamType = 'Investment Scam';
    }
  }

  if (phones.length > 0 && (hasUrgency || hasSensitiveData)) {
    indicators.push('Urgent phone call request');
    riskScore += 15;
    indicatorCount++;
    reasons.push('Requests immediate phone call combined with urgency or data request');

    if (scamType === 'None detected') {
      scamType = 'Fake Support Scam';
    }
  }

  if (hasVerify && (urls.length > 0 || hasSensitiveData)) {
    indicators.push('Verification scam pattern');
    riskScore += 20;
    indicatorCount++;
    reasons.push('Asks to verify account or update details via link or sensitive info');

    if (urls.length > 0 && hasSuspiciousLink) {
      if (scamType === 'None detected') {
        scamType = 'Phishing Link';
      }
    }
  }

  if (hasCrypto && hasInvestmentScamKeywords) {
    indicators.push('Cryptocurrency investment scam detected');
    riskScore += 35;
    indicatorCount++;
    reasons.push('Message promotes cryptocurrency investment with suspicious claims');

    if (scamType === 'None detected') {
      scamType = 'Crypto Investment Scam';
    }
  } else if (hasCrypto && (hasUrgency || hasPayment)) {
    indicators.push('Suspicious cryptocurrency request');
    riskScore += 30;
    indicatorCount++;
    reasons.push('Message requests cryptocurrency transfer with urgency or payment');

    if (scamType === 'None detected') {
      scamType = 'Crypto Investment Scam';
    }
  }

  if (hasInvestmentScamKeywords && hasHighReturns) {
    indicators.push('Unrealistic returns promise');
    riskScore += 28;
    indicatorCount++;
    reasons.push('Message promises unrealistic daily or recurring returns on investment');

    if (scamType === 'None detected' || scamType === 'Investment Scam') {
      scamType = 'Investment Scam';
    }
  } else if (hasInvestmentScamKeywords && hasUrgency) {
    indicators.push('Investment pressure tactic');
    riskScore += 25;
    indicatorCount++;
    reasons.push('Investment opportunity combined with urgency to limit decision time');

    if (scamType === 'None detected') {
      scamType = 'Investment Scam';
    }
  }

  if (indicators.length === 0) {
    safeIndicators.push('No suspicious payment requests detected');
    safeIndicators.push('No sensitive information requested');
    if (urls.length === 0) {
      safeIndicators.push('No suspicious links detected');
    }
    reasons.push('Message appears to be a normal notification');
  }

  riskScore = Math.min(riskScore, 100);

  let classification: 'Legitimate' | 'Suspicious' | 'Scam';
  let advice: string;

  const criticalIndicators = hasSensitiveData || hasPayment || hasSuspiciousLink ||
                           hasUrgency || hasFear || hasReward || hasCrypto || hasInvestmentScamKeywords;

  if (indicatorCount === 0 && !criticalIndicators) {
    riskScore = Math.min(riskScore, 25);
    classification = 'Legitimate';
    advice = 'This message appears legitimate. However, always verify sender details and never share OTP or banking information.';
  } else if (indicatorCount === 0) {
    riskScore = Math.max(riskScore, 26);
    riskScore = Math.min(riskScore, 50);
    classification = 'Suspicious';
    advice = 'This message shows suspicious patterns. Verify the sender through official channels before taking any action. Do not click links or share any information.';
  } else if (scamType === 'Crypto Investment Scam') {
    riskScore = Math.max(riskScore, 70);
    classification = 'Scam';
    advice = 'This is a cryptocurrency investment scam. DO NOT send any cryptocurrency or share wallet details. Block the sender immediately.';
  } else if (scamType !== 'None detected') {
    riskScore = Math.max(riskScore, 40);
    if (riskScore <= 50) {
      riskScore = Math.max(riskScore, 40);
      riskScore = Math.min(riskScore, 50);
      classification = 'Suspicious';
      advice = 'This message shows suspicious patterns. Verify the sender through official channels before taking any action. Do not click links or share any information.';
    } else if (riskScore <= 75) {
      riskScore = Math.max(riskScore, 51);
      classification = 'High Risk';
      advice = 'This message shows strong scam indicators. DO NOT respond, click links, or share any information. Delete this message and block the sender.';
    } else {
      riskScore = Math.max(riskScore, 76);
      classification = 'Scam';
      advice = 'This message shows strong scam indicators. DO NOT respond, click links, or share any information. Delete this message and block the sender.';
    }
  } else if (riskScore <= 25) {
    classification = 'Legitimate';
    advice = 'This message appears legitimate. However, always verify sender details and never share OTP or banking information.';
  } else if (riskScore <= 50) {
    riskScore = Math.max(riskScore, 26);
    classification = 'Suspicious';
    advice = 'This message shows suspicious patterns. Verify the sender through official channels before taking any action. Do not click links or share any information.';
  } else if (riskScore <= 75) {
    riskScore = Math.max(riskScore, 51);
    classification = 'High Risk';
    advice = 'This message shows strong scam indicators. DO NOT respond, click links, or share any information. Delete this message and block the sender.';
  } else {
    riskScore = Math.max(riskScore, 76);
    classification = 'Scam';
    advice = 'This message shows strong scam indicators. DO NOT respond, click links, or share any information. Delete this message and block the sender.';
  }

  if ((hasSensitiveData || hasPayment || hasSuspiciousLink || hasUrgency || hasFear || hasReward ||
       hasCrypto || hasInvestmentScamKeywords) && classification === 'Legitimate') {
    classification = 'Suspicious';
    riskScore = Math.max(riskScore, 26);
  }

  return {
    risk_score: riskScore,
    risk_level: getRiskLevel(riskScore),
    classification,
    scam_type: scamType,
    indicators,
    sensitive_data_detected: sensitiveData,
    psychology_tactics: psychologyTactics,
    reasons,
    safe_indicators: safeIndicators,
    advice
  };
}

function getRiskLevel(score: number): 'Low' | 'Medium' | 'High' {
  if (score <= 25) return 'Low';
  if (score <= 50) return 'Medium';
  return 'High';
}
