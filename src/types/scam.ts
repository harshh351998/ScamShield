export type ScamType =
| 'None detected'
| 'OTP Scam'
| 'Bank Phishing Scam'
| 'UPI Payment Scam'
| 'UPI Collect Scam'
| 'Crypto Investment Scam'
| 'Stock Market Scam'
| 'Job Scam'
| 'Delivery Scam'
| 'Lottery Scam'
| 'Fake Support Scam'
| 'Government Scam'
| 'SIM Swap Scam'
| 'Remote Access Scam'
| 'APK Malware Scam'
| 'Credit Card Scam'
| 'Gift Card Scam';

export interface ScamAnalysisResult {
risk_score: number;
risk_level: 'Low' | 'Medium' | 'High';
classification: 'Legitimate' | 'Suspicious' | 'High Risk' | 'Scam';
scam_type: ScamType;
indicators: string[];
sensitive_data_detected: string[];
psychology_tactics: string[];
reasons: string[];
safe_indicators: string[];
advice: string;
}

export interface TrustedDomain {
domain: string;
brand: string;
}
