export interface ScamAnalysisResult {
  risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  classification: 'Legitimate' | 'Suspicious' | 'High Risk' | 'Scam';
  scam_type: string;
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
