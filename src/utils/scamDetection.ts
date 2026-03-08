import { ScamAnalysisResult, ScamType } from '../types/scam';
import { extractURLs, getDomain, hasSuspiciousTLD, isShortenedURL, extractPhoneNumbers } from './urlDetection';
import { trustedDomains } from './trustedDomains';

/* ---------------- KEYWORDS ---------------- */

const urgencyKeywords = [
'urgent','immediately','act now','today only','expires today',
'last chance','limited time','hurry','now'
];

const fearKeywords = [
'blocked','suspended','account locked','legal action','arrest','penalty','investigation'
];

const paymentKeywords = [
'payment','pay','fee','charge','amount','rs','inr',
'google pay','phonepe','paytm','upi','gpay'
];

const sensitiveKeywords = [
'otp','password','pin','cvv','card number','bank details',
'aadhaar','pan'
];

const rewardKeywords = [
'won','winner','lottery','reward','cashback','guaranteed','profit'
];

const cryptoKeywords = [
'bitcoin','btc','ethereum','eth','crypto','wallet','mining'
];

const investmentKeywords = [
'daily returns','guaranteed returns','double your money',
'passive income','investment opportunity','trading bot'
];

const stockKeywords = [
'stock tips','multibagger','trading signals','telegram trading','share tips'
];

const jobKeywords = [
'work from home','data entry job','earn per day','registration fee','online job'
];

const bankKeywords = [
'bank','sbi','hdfc','icici','axis','account','kyc'
];

const deliveryKeywords = [
'parcel','delivery','shipment','courier','tracking','package'
];

const lotteryKeywords = [
'lucky draw','lottery','jackpot','prize money'
];

const techSupportKeywords = [
'microsoft support','technical support','virus detected','computer infected','security alert'
];

const governmentKeywords = [
'income tax','tax notice','government penalty','rbi notice','cbi investigation','police case','digital arrest'
];

const giftCardKeywords = [
'gift card','amazon gift card','itunes card','google play card'
];

const simSwapKeywords = [
'sim upgrade','sim verification','sim block','sim activation'
];

const remoteAccessKeywords = [
'anydesk','teamviewer','quicksupport','screen share','remote access'
];

const apkKeywords = [
'.apk','download app','install app','kyc update app'
];

const creditCardKeywords = [
'credit card limit','limit upgrade','card verification','limit increase'
];

const upiCollectKeywords = [
'collect request','approve request','accept payment request'
];

/* ---------------- REGEX ---------------- */

const percentagePattern =
/(\d+\s*%\s*(daily|weekly|monthly|return))/i;

const cashbackPattern =
/(?:pay|send)?\s*(?:₹|rs.?)?\s*\d{2,6}\s*(?:to|get|receive)\s*(?:₹|rs.?)?\s*\d{2,6}/i;

/* ---------------- MAIN FUNCTION ---------------- */

export function analyzeMessage(text: string, urlInput?: string): ScamAnalysisResult {

const indicators: string[] = [];
const reasons: string[] = [];
const psychology: string[] = [];
const sensitiveData: string[] = [];
const safeIndicators: string[] = [];

let riskScore=0;
let scamType: ScamType = 'None detected';

const lowerText=text.toLowerCase();

const urls=extractURLs(text);
if(urlInput) urls.push(urlInput);

const phones=extractPhoneNumbers(text);

let suspiciousLink=false;

/* ---------- URL ANALYSIS ---------- */

urls.forEach(url=>{

const domain=getDomain(url);

if(isShortenedURL(url)){
indicators.push('Shortened URL detected');
reasons.push('Shortened URLs can hide the real website destination');
riskScore+=20;
suspiciousLink=true;
}

if(hasSuspiciousTLD(url)){
indicators.push('Suspicious domain extension');
reasons.push('Domain extension often used by scam websites');
riskScore+=20;
suspiciousLink=true;
}

const trusted=trustedDomains.some(td=>domain===td.domain||domain.endsWith(`.${td.domain}`));

if(!trusted){
indicators.push('Untrusted domain');
reasons.push('Link belongs to an unknown or unverified website');
riskScore+=15;
suspiciousLink=true;
}else{
safeIndicators.push('Trusted domain detected');
}

});

/* ---------- SIGNAL DETECTION ---------- */

const hasUrgency=urgencyKeywords.some(k=>lowerText.includes(k));
const hasFear=fearKeywords.some(k=>lowerText.includes(k));
const hasPayment=paymentKeywords.some(k=>lowerText.includes(k));
const hasSensitive=sensitiveKeywords.some(k=>lowerText.includes(k));
const hasReward=rewardKeywords.some(k=>lowerText.includes(k));
const hasCrypto=cryptoKeywords.some(k=>lowerText.includes(k));
const hasInvestment=investmentKeywords.some(k=>lowerText.includes(k));
const hasStock=stockKeywords.some(k=>lowerText.includes(k));
const hasJob=jobKeywords.some(k=>lowerText.includes(k));
const hasBank=bankKeywords.some(k=>lowerText.includes(k));
const hasDelivery=deliveryKeywords.some(k=>lowerText.includes(k));
const hasLottery=lotteryKeywords.some(k=>lowerText.includes(k));
const hasTechSupport=techSupportKeywords.some(k=>lowerText.includes(k));
const hasGovernment=governmentKeywords.some(k=>lowerText.includes(k));
const hasGiftCard=giftCardKeywords.some(k=>lowerText.includes(k));
const hasSimSwap=simSwapKeywords.some(k=>lowerText.includes(k));
const hasRemoteAccess=remoteAccessKeywords.some(k=>lowerText.includes(k));
const hasAPK=apkKeywords.some(k=>lowerText.includes(k));
const hasCreditCard=creditCardKeywords.some(k=>lowerText.includes(k));
const hasUPICollect=upiCollectKeywords.some(k=>lowerText.includes(k));

const highReturn=percentagePattern.test(text);
const cashback=cashbackPattern.test(text);

/* ---------- PSYCHOLOGY ---------- */

if(hasUrgency){
psychology.push('Urgency');
indicators.push('Uses urgency tactics');
reasons.push('Creates pressure to act immediately');
riskScore+=15;
}

if(hasFear){
psychology.push('Fear');
indicators.push('Uses fear tactics');
reasons.push('Threatens legal action or account blocking');
riskScore+=20;
}

if(hasReward){
psychology.push('Greed');
indicators.push('Promises unrealistic rewards');
reasons.push('Promises prizes, cashback, or guaranteed profit');
riskScore+=25;
}

/* ---------- SENSITIVE DATA ---------- */

if(hasSensitive){
indicators.push('Sensitive information requested');
reasons.push('Message asks for OTP or banking information');
sensitiveData.push('personal information');
riskScore+=30;
scamType='OTP Scam';
}

/* ---------- BANK PHISHING ---------- */

if(hasBank&&(hasSensitive||suspiciousLink)){
indicators.push('Bank impersonation detected');
reasons.push('Pretends to be a bank requesting verification');
psychology.push('Authority');
riskScore+=35;
scamType='Bank Phishing Scam';
}

/* ---------- DELIVERY SCAM ---------- */

if(hasDelivery&&hasPayment){
indicators.push('Delivery scam detected');
reasons.push('Fake parcel delivery asking for payment');
riskScore+=30;
scamType='Delivery Scam';
}

/* ---------- LOTTERY SCAM ---------- */

if(hasLottery&&hasReward){
indicators.push('Lottery scam detected');
reasons.push('Claims you won a prize or jackpot');
riskScore+=30;
scamType='Lottery Scam';
}

/* ---------- UPI COLLECT SCAM ---------- */

if(hasUPICollect){
indicators.push('UPI collect request scam');
reasons.push('Tricks users into approving payment requests');
riskScore+=30;
scamType='UPI Collect Scam';
}

/* ---------- PAYMENT SCAM ---------- */

if(hasPayment){
indicators.push('Payment request detected');
reasons.push('Message requests money transfer');
riskScore+=25;

if(cashback){
indicators.push('Cashback scam pattern');
reasons.push('Small payment promised to generate larger reward');
riskScore+=35;
scamType='UPI Payment Scam';
}
}

/* ---------- CRYPTO SCAM ---------- */

if(hasCrypto&&(hasInvestment||highReturn)){
indicators.push('Cryptocurrency investment scam');
reasons.push('Crypto investment promising unrealistic returns');
riskScore=Math.max(riskScore+35,70);
scamType='Crypto Investment Scam';
}

/* ---------- STOCK SCAM ---------- */

if(hasStock&&(hasReward||hasInvestment)){
indicators.push('Stock trading scam');
reasons.push('Message promotes guaranteed stock profits');
riskScore+=30;
scamType='Stock Market Scam';
}

/* ---------- JOB SCAM ---------- */

if(hasJob&&hasPayment){
indicators.push('Job scam detected');
reasons.push('Work-from-home job asking for registration fee');
riskScore+=30;
scamType='Job Scam';
}

/* ---------- TECH SUPPORT SCAM ---------- */

if(hasTechSupport){
indicators.push('Fake tech support scam');
reasons.push('Claims device infection and asks to call support');
riskScore+=25;
scamType='Fake Support Scam';
}

/* ---------- GOVERNMENT / DIGITAL ARREST ---------- */

if(hasGovernment){
indicators.push('Government impersonation scam');
reasons.push('Pretends to be police or government investigation');
riskScore+=35;
scamType='Government Scam';
}

/* ---------- SIM SWAP SCAM ---------- */

if(hasSimSwap){
indicators.push('SIM swap scam');
reasons.push('Requests SIM verification or activation');
riskScore+=30;
scamType='SIM Swap Scam';
}

/* ---------- REMOTE ACCESS SCAM ---------- */

if(hasRemoteAccess){
indicators.push('Remote access app scam');
reasons.push('Requests installation of remote control apps');
riskScore+=30;
scamType='Remote Access Scam';
}

/* ---------- APK MALWARE SCAM ---------- */

if(hasAPK){
indicators.push('APK malware scam');
reasons.push('Requests downloading suspicious APK application');
riskScore+=30;
scamType='APK Malware Scam';
}

/* ---------- CREDIT CARD SCAM ---------- */

if(hasCreditCard&&hasSensitive){
indicators.push('Credit card upgrade scam');
reasons.push('Asks OTP for credit card limit upgrade');
riskScore+=30;
scamType='Credit Card Scam';
}

/* ---------- GIFT CARD SCAM ---------- */

if(hasGiftCard){
indicators.push('Gift card scam');
reasons.push('Requests payment through gift cards');
riskScore+=25;
scamType='Gift Card Scam';
}

/* ---------- PHONE SCAM ---------- */

if(phones.length>0&&(hasUrgency||hasSensitive)){
indicators.push('Suspicious phone call request');
reasons.push('Asks victim to call unknown number urgently');
riskScore+=15;
if(scamType==='None detected') scamType='Fake Support Scam';
}

/* ---------- FINAL SCORE ---------- */

riskScore=Math.min(riskScore,100);

let classification:'Legitimate'|'Suspicious'|'Scam';
let advice:string;

if(riskScore<=25){
classification='Legitimate';
advice='Message appears safe but always verify sender.';
}
else if(riskScore<=50){
classification='Suspicious';
advice='Message shows suspicious patterns. Verify before taking action.';
}
else{
classification='Scam';
advice='Strong scam indicators detected. Do not respond or share information.';
}

return{
risk_score:riskScore,
risk_level:getRiskLevel(riskScore),
classification,
scam_type:scamType,
indicators,
sensitive_data_detected:sensitiveData,
psychology_tactics:psychology,
reasons,
safe_indicators:safeIndicators,
advice
};

}

function getRiskLevel(score:number):'Low'|'Medium'|'High'{
if(score<=25)return'Low';
if(score<=50)return'Medium';
return'High';
}
