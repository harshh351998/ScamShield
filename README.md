## ScamShield.ai

ScamShield.ai is a simple web tool that helps analyze suspicious messages or links to identify potential scam patterns.
The goal of this project is to explore how common scam indicators can be detected using rule-based analysis.

### Live Demo

https://scam-shield.bolt.host/

### Project Overview

Online scams are becoming increasingly common through SMS, WhatsApp, delivery notifications, investment offers, and phishing links. Many of these messages create urgency, fear, or promise rewards to trick users.

ScamShield.ai allows users to paste a suspicious message or link and analyze it for common scam signals.

The tool evaluates different indicators and provides a quick risk assessment to help users understand whether a message might be suspicious.

### Features

Analyze suspicious text messages

Detect phishing or suspicious links

Identify requests for sensitive information (OTP, passwords, bank details)

Detect common scam patterns such as:

Delivery scams

Investment scams

Crypto scams

Lottery scams

UPI payment scams

Generate:

Risk Score

Scam Classification

Warning Indicators

Psychological tactics used by scammers

Example Analysis Output

The system evaluates multiple signals and produces results like:

Risk Score: 75/100
Classification: Scam
Indicators: Suspicious link, urgency tactics, sensitive data request

This helps explain why a message might be risky.

### Tech Stack

React

TypeScript

Vite

Rule-based scam detection logic

URL pattern analysis

The project was prototyped and developed with the help of Bolt AI (bolt.new) to accelerate development.

### How It Works

The detection engine uses a rule-based approach that analyzes:

Suspicious keywords

URL patterns

Domain reputation signals

Scam-related phrases

Psychological tactics such as urgency or fear

Each indicator contributes to a risk score which determines the final classification.

### Project Structure

src/
components/
utils/
scamDetection.ts
urlDetection.ts
trustedDomains.ts
types/

Running the Project Locally

### Clone the repository

git clone https://github.com/your-username/scamshield.git

Navigate to the project directory

cd scamshield

Install dependencies

npm install

Start the development server

npm run dev

Open in browser

http://localhost:5173

### Disclaimer

This project is intended for educational and awareness purposes.
The detection logic is rule-based and may not identify every possible scam.

Always verify suspicious messages through official sources.

### Future Improvements

Integrate domain reputation APIs

Add phishing database checks

Improve detection logic with machine learning

Support screenshot analysis for scam detection

Feedback

Suggestions and improvements are welcome.
If you find this project useful, feel free to open an issue or contribute.
