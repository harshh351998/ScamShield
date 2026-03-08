import { useState, useEffect } from 'react';
import { AlertTriangle, Search } from 'lucide-react';

interface InputFormProps {
  onAnalyze: (message: string, url: string) => void;
  isLoading: boolean;
}

export default function InputForm({ onAnalyze, isLoading }: InputFormProps) {
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleFillExample = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMessage(customEvent.detail);
      setUrl('');
    };

    window.addEventListener('fillExample', handleFillExample);
    return () => window.removeEventListener('fillExample', handleFillExample);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const combinedText = message + ' ' + url;
    if (combinedText.trim().length < 10) {
      setError('Please enter at least 10 characters');
      return;
    }

    if (combinedText.length > 2000) {
      setError('Input exceeds maximum length of 2000 characters');
      return;
    }

    onAnalyze(message, url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Paste suspicious message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste message from SMS, WhatsApp, Email, etc..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          Or paste suspicious link
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://suspicious-link.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || (!message.trim() && !url.trim())}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Analyzing message...</span>
          </>
        ) : (
          <>
            <Search size={20} />
            <span>Analyze Message</span>
          </>
        )}
      </button>
    </form>
  );
}
