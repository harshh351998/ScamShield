import { AlertTriangle, Shield, AlertCircle, Copy, CheckCircle } from 'lucide-react';
import { ScamAnalysisResult } from '../types/scam';
import { useState } from 'react';

interface ResultsCardProps {
  result: ScamAnalysisResult;
}

export default function ResultsCard({ result }: ResultsCardProps) {
  const [copied, setCopied] = useState(false);

  const getRiskColor = () => {
    switch (result.risk_level) {
      case 'Low':
        return 'bg-green-50 border-green-200';
      case 'Medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'High':
        return 'bg-red-50 border-red-200';
    }
  };

  const getRiskBadgeColor = () => {
    switch (result.risk_level) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
    }
  };

  const getRiskIcon = () => {
    switch (result.risk_level) {
      case 'Low':
        return <Shield className="text-green-600" size={24} />;
      case 'Medium':
        return <AlertCircle className="text-yellow-600" size={24} />;
      case 'High':
        return <AlertTriangle className="text-red-600" size={24} />;
    }
  };

  const copyAnalysis = () => {
    const text = `ScamShield Analysis\n
Risk Level: ${result.risk_level} (${result.risk_score}/100)
Classification: ${result.classification}
Scam Type: ${result.scam_type}

${result.reasons.join('\n')}

Advice: ${result.advice}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`border-2 rounded-xl p-6 ${getRiskColor()} space-y-6 animate-fadeIn`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {getRiskIcon()}
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Analysis Results
            </h3>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeColor()}`}>
              {result.risk_level} Risk
            </span>
          </div>
        </div>
        <button
          onClick={copyAnalysis}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Risk Score</span>
          <span className="text-2xl font-bold text-gray-900">{result.risk_score}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              result.risk_level === 'Low'
                ? 'bg-green-500'
                : result.risk_level === 'Medium'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${result.risk_score}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Classification</h4>
          <p className="text-gray-700">{result.classification}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Scam Type</h4>
          <p className="text-gray-700">{result.scam_type}</p>
        </div>
      </div>

      {result.indicators.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">⚠ Warning Indicators</h4>
          <ul className="space-y-2">
            {result.indicators.map((indicator, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                <span>{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.sensitive_data_detected.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 mb-2">🔒 Sensitive Data Requested</h4>
          <div className="flex flex-wrap gap-2">
            {result.sensitive_data_detected.map((data, idx) => (
              <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {data}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.psychology_tactics.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">🧠 Psychological Tactics Detected</h4>
          <div className="flex flex-wrap gap-2">
            {result.psychology_tactics.map((tactic, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {tactic}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Why this classification?</h4>
        <ul className="space-y-2">
          {result.reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.safe_indicators.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">✓ Safe Indicators</h4>
          <ul className="space-y-2">
            {result.safe_indicators.map((indicator, idx) => (
              <li key={idx} className="flex items-start gap-2 text-green-800">
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Recommended Action</h4>
        <p className="text-blue-800">{result.advice}</p>
      </div>
    </div>
  );
}
