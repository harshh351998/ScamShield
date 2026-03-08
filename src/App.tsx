import { useState } from 'react';
import { Shield, AlertTriangle, Lock } from 'lucide-react';
import InputForm from './components/InputForm';
import ResultsCard from './components/ResultsCard';
import EducationalSection from './components/EducationalSection';
import ExampleMessages from './components/ExampleMessages';
import { analyzeMessage } from './utils/scamDetection';
import { ScamAnalysisResult } from './types/scam';

function App() {
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (message: string, url: string) => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeMessage(message, url);
      setResult(analysis);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectExample = (message: string) => {
    const event = new CustomEvent('fillExample', { detail: message });
    window.dispatchEvent(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              ScamShield<span className="text-blue-600">.ai</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Detect scams from SMS, WhatsApp, Telegram, Email, and social media messages.
            Protect yourself from fraud with AI-powered analysis.
          </p>
        </header>

        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Security Warning</h3>
              <p className="text-red-800 text-sm leading-relaxed">
                Never share OTP, bank details, passwords, Aadhaar, or PIN with anyone.
                Legitimate organizations will not ask for these over messages.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <Lock size={18} />
            <p className="text-sm">
              <span className="font-medium">Privacy Notice:</span> Your message is analyzed only for scam detection and is not stored.
            </p>
          </div>

          <InputForm
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        {result && (
          <div className="mb-6">
            <ResultsCard result={result} />
          </div>
        )}

        <div className="mb-6">
          <ExampleMessages onSelectExample={handleSelectExample} />
        </div>

        <EducationalSection />

        <footer className="mt-12 text-center text-gray-600 text-sm py-6 border-t border-gray-200">
          <p className="mb-2">Built to protect people from digital scams</p>
          <p className="text-xs text-gray-500">
            Always verify suspicious messages through official channels
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
