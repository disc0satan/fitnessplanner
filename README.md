# Elite Fitness AI

A high-performance, responsive React application that generates personalized, AI-driven weekly fitness plans. Users input basic biometric data and fitness goals, and the application generates a structured, card-based workout routine using a cloud-based Large Language Model (LLM).

* **Live Demo**: https://fitnessplanner-theta.vercel.app/

---

## Screenshots
* **Desktop view Input Form , Fitness Plan, Initializing, Error Messaging**
*  **Desktop view Input Form , Fitness Plan**
<img width="354" height="535" alt="Screenshot 2026-03-08 at 7 53 09 PM" src="https://github.com/user-attachments/assets/e1f79501-f2ee-4cdd-8567-484d9135b0d7" />
<img width="354" height="535" alt="Screenshot 2026-03-08 at 7 18 50 PM" src="https://github.com/user-attachments/assets/5aefd017-9fbb-4009-b588-f559711d4ace" />
<img width="399" height="593" alt="Screenshot 2026-03-08 at 7 15 49 PM" src="https://github.com/user-attachments/assets/0538756e-0972-428d-a794-d5c267d18dd1" />
<img width="399" height="593" alt="Screenshot 2026-03-08 at 7 15 56 PM" src="https://github.com/user-attachments/assets/ea2ea3ab-be5f-4fec-9539-1460fdb92e53" />
<img width="399" height="593" alt="Screenshot 2026-03-08 at 7 16 04 PM" src="https://github.com/user-attachments/assets/a1d7b111-1f9d-47af-b395-c90fab751cdc" />
<img width="399" height="593" alt="Screenshot 2026-03-08 at 7 16 11 PM" src="https://github.com/user-attachments/assets/10c6a05e-b428-4f45-9a0f-3da76df94767" />
<img width="399" height="593" alt="Screenshot 2026-03-08 at 7 16 14 PM" src="https://github.com/user-attachments/assets/4eff00fe-9e34-4911-a091-fb6f2d023a2f" />
<img width="369" height="581" alt="Screenshot 2026-03-08 at 7 42 07 PM" src="https://github.com/user-attachments/assets/211bbd06-af67-4db8-ae97-acdc197a9f3b" />
<img width="369" height="581" alt="Screenshot 2026-03-08 at 7 42 11 PM" src="https://github.com/user-attachments/assets/92612a41-c11e-4586-b814-997f896a0400" />
<img width="369" height="581" alt="Screenshot 2026-03-08 at 7 42 16 PM" src="https://github.com/user-attachments/assets/37bee87b-312c-4162-b6b1-7bbbc1a84db4" />
<img width="369" height="581" alt="Screenshot 2026-03-08 at 7 42 21 PM" src="https://github.com/user-attachments/assets/8c7c5ba3-9e45-4252-926e-71a6cf4c4f32" />
<img width="399" height="593" alt="Screenshot 2026-03-08 at 7 16 22 PM" src="https://github.com/user-attachments/assets/c0f9a8fc-75c1-47f1-8734-e530f75fcb88" />



## Key Features

### 1) Intelligent Plan Generator
Users provide details to receive a highly customized 7-day routine:
* **Biometrics**: Age, Weight (kg), Height (cm), and Gender.
* **Experience Tier**: Beginner, Intermediate, or Advanced levels.
* **Objectives**: Multi-select goals (e.g., Lose Fat, Build Muscle, Mobility).
* **Weekly Load**: Adjustable active days per week (3–7 days).

### 2) Clean, Card-Based UI
* **Daily Workout Accordions**: Expandable cards detailing session duration, estimated calorie burn, and intensity.
* **Exercise Breakdowns**: Specific movements complete with sets, reps, and AI-generated form tips.
* **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.

---

## Technical Architecture
* **Frontend Framework**: React.js (Component-based architecture).
* **Build Tool**: Vite (Optimized for fast local development and production bundling).
* **Styling**: SCSS Modules utilizing a centralized Design Token system (CSS Variables) for a consistent dark-mode theme.
* **AI Integration**: Multi-model architecture via the OpenRouter API, utilizing OpenAI-compatible chat completions. 
    * google/gemini-2.0-flash-lite-preview-02-05:free
    * openai/gpt-3.5-turbo
    * mistralai/mistral-7b-instruct:free
* **Deployment**: Hosted on Vercel with automated CI/CD integration for high-performance delivery.


* **Structured AI Output (JSON Contract):**
To ensure the UI renders reliably without crashing, the AI is instructed via a strict system prompt to always return data in this exact JSON schema:
```
JSON

{
  "weekly_summary": {
    "total_days": 7,
    "rest_days": number,
    "total_kcal": number
  },
  "nutrition_tip": "string (one-sentence elite performance tip)",
  "recovery_tip": "string (one-sentence recovery protocol tip)",
  "days": [
    {
      "day": "DAY 01",
      "type": "STRENGTH | CARDIO | RECOVERY",
      "title": "string",
      "duration_min": number,
      "calories_est": number,
      "intensity": "LOW | MODERATE | HIGH | ELITE",
      "exercises": [
        { "name": "string", "sets": number, "reps": "string/number" }
      ],
      "protocol": "string (brief instruction)"
    }
  ]
}
```
---

## ChatGPT Conversation Link
 https://chatgpt.com/share/69ad8d92-2dc4-800a-9ddc-9b6a0a38cae6
---

## Technical Challenges & Solutions
* **1. Handling Unpredictable AI JSON Formatting**:Free-tier LLMs occasionally append conversational text or invalid trailing commas to the JSON, which caused JSON.parse() to throw syntax errors and crash the UI.

Solution: Implemented a custom cleanAndParseJSON utility that strips trailing commas using Regex and isolates the JSON block before parsing, ensuring the React state always receives a valid object.

* **2.AI Limitations & Reality Check**:
* Integrating external LLMs comes with real-world constraint. Rate Limiting (429 Errors):
* The application utilizes free-tier models via OpenRouter. During peak global traffic hours, the servers may return a "busy" response.
* Privacy Requirements: Free models require specific "Data Training" and "Prompt Publishing" settings to be enabled on OpenRouter; otherwise, they return a 401 Unauthorized error.
* Response Variance: AI-generated workouts are dynamic fitness suggestions and may vary between generation runs.

---

## Technical ArchitectureInstallation & Running Locally
To experience the full AI generation capabilities without rate-limiting interruptions, you can run this project locally:

* **1. Clone the repository**
```
Bash

git clone https://github.com/disc0satan/fitnessplanner.git
cd fitnessplanner
```
* **2. Install dependencies**
```
Bash

npm install
```
* **3. Configure Environment Variables**
Create a .env file in the root directory (same folder as package.json):
```
Code snippet

VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```
(Note: Ensure your OpenRouter key has free endpoints enabled in your privacy settings).

* **4. Start the development server**

```
Bash

npm run dev
```
The application will be running at http://localhost:5173.

---

## Quality Assurance & Testing

* ** Multiple Responsive Breakpoints Tested**

* **Error Handling**
Implemented safeguards against malformed AI JSON responses and API timeout/rate-limit failures to guarantee the app does not crash.

---

## License
* This project is licensed under the MIT License provided for educational and evaluation purposes.
---

## Acknowledgements
* OpenRouter for providing flexible API access to leading LLMs.
* UI inspiration and layout structures adapted from provided Figma design mockups.
* Built utilizing the React and Vite open-source ecosystems.
