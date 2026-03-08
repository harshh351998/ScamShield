import { MessageSquare } from 'lucide-react';

interface ExampleMessagesProps {
  onSelectExample: (message: string) => void;
}

export default function ExampleMessages({ onSelectExample }: ExampleMessagesProps) {
  const examples = [
    {
      title: 'Bank KYC Scam',
      message: 'Dear Customer, Your SBI account will be blocked today. Update your KYC immediately at: http://sbi-kyc-update.xyz/verify. Share OTP to complete verification.'
    },
    {
      title: 'Delivery Fee Scam',
      message: 'Your parcel from Amazon is pending delivery. Pay Rs. 50 delivery fee via PhonePe to 9876543210. Parcel will be returned if not paid within 2 hours.'
    },
    {
      title: 'Prize/Lottery Scam',
      message: 'Congratulations! You have won Rs. 5 lakh in Google Lucky Draw 2024. To claim your prize, send your Aadhaar and PAN details to this number immediately.'
    },
    {
      title: 'Tech Support Scam',
      message: 'URGENT: Your computer has been infected with virus. Call our Microsoft support team at 1800-XXX-XXXX immediately to fix the issue or your data will be lost forever.'
    },
    {
      title: 'Crypto Investment Scam',
      message: 'Limited Opportunity! Earn guaranteed 20% daily returns. Send 1000 USDT to our mining pool and earn Rs. 20,000 per day. Hurry - only 5 slots left! Start today at: http://bit-mining-elite.top'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Try Example Scam Messages</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">
        Click on any example below to test the scam detector
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {examples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => onSelectExample(example.message)}
            className="text-left p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-2">{example.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{example.message}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
