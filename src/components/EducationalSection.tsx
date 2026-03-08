import { Brain, Clock, ShieldAlert, DollarSign } from 'lucide-react';

export default function EducationalSection() {
  const tactics = [
    {
      icon: <Clock className="text-orange-600" size={24} />,
      title: 'Urgency Tactics',
      description: 'Scammers create fake urgency with phrases like "act now" or "account will be blocked today" to pressure you into making quick decisions without thinking.',
      examples: ['Act immediately', 'Limited time offer', 'Expires today']
    },
    {
      icon: <ShieldAlert className="text-red-600" size={24} />,
      title: 'Fear Tactics',
      description: 'They use threats like account suspension, legal action, or arrest to scare you into sharing information or paying money.',
      examples: ['Account will be blocked', 'Legal action will be taken', 'Police complaint filed']
    },
    {
      icon: <DollarSign className="text-green-600" size={24} />,
      title: 'Greed Tactics',
      description: 'Scammers promise unrealistic rewards, guaranteed profits, lottery wins, or cashback to lure victims.',
      examples: ['You won a prize', 'Guaranteed returns', 'Get rich quick']
    },
    {
      icon: <Brain className="text-purple-600" size={24} />,
      title: 'Authority Impersonation',
      description: 'They pretend to be from banks, government agencies, or well-known companies to gain your trust.',
      examples: ['From your bank', 'Government official', 'Tech support']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How Scammers Try to Trick You
        </h2>
        <p className="text-gray-600">
          Understanding these tactics helps you spot scams before falling victim
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tactics.map((tactic, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-3">
              {tactic.icon}
              <h3 className="font-semibold text-gray-900">{tactic.title}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {tactic.description}
            </p>
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-500 mb-2">Common phrases:</p>
              <div className="flex flex-wrap gap-2">
                {tactic.examples.map((example, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700">
                    "{example}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-5">
        <h3 className="font-semibold text-gray-900 mb-3">🛡 Remember:</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>No legitimate organization will ask for OTP, PIN, or passwords via message</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Banks never ask you to update KYC or verify account via links</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Always verify by calling official customer care numbers from the company website</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>If something feels urgent or too good to be true, it's probably a scam</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
