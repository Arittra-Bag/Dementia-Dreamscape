# 🧠 Dementia Dreamscape

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-%2361DAFB.svg?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-%23007ACC.svg?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-%2338B2AC.svg?style=flat&logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-%23009688.svg?style=flat&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.8+-%233776AB.svg?style=flat&logo=python)

[Demo](https://dementia-dreamscape.vercel.app) · [Report Bug](mailto:arittrabag@gmail.com) · [Request Feature](mailto:arittrabag@gmail.com)

</div>

> An AI-powered platform that helps detect early signs of dementia through MRI analysis.

| 🔥 Features | 🛠️ Technology | 📊 Capabilities |
|------------|---------------|----------------|
| Real-time Analysis | React + TypeScript | MRI Scan Analysis |
| AI-Powered Insights | FastAPI Backend | Dementia Classification |
| Modern UI/UX | TensorFlow | Confidence Scoring |
| Responsive Design | Google Gemini | Detailed Reports |

## ✨ What is Dementia Dreamscape?

Dementia Dreamscape is a modern web application that combines cutting-edge AI technology with medical imaging to assist in the early detection of Alzheimer's disease and other forms of dementia. By analyzing brain MRI scans, our platform provides:

- 🔍 Instant analysis of brain MRI scans
- 📊 Detailed confidence scores for different stages of dementia
- 💡 AI-generated insights and recommendations
- 🏥 Educational resources about dementia care

**Important**: This tool is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis or advice.

## 🚀 Getting Started

### Prerequisites

- Node.js (for frontend)
- Python 3.8+ (for backend)
- A modern web browser

### Frontend Setup

1. Install the dependencies:
```bash
npm install
```

2. Fire up the development server:
```bash
npm run dev
```

Your app will be running at `http://localhost:5173` 🎉

### Backend Setup

1. Create and activate a Python virtual environment:

```bash
# Create virtual environment
cd backend
python -m venv venv

# Activate it on Windows
venv\Scripts\activate

# Or on macOS/Linux
source venv/bin/activate
```

2. Install the Python packages:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000` 🚀

## 🎯 How to Use

1. Open the application in your browser
2. Upload a brain MRI scan using the drag-and-drop interface or file selector
3. Click "Analyze MRI" to start the analysis
4. View the results, which include:
   - Predicted dementia classification
   - Confidence scores for each category
   - Detailed AI-generated insights
   - Recommended next steps

## 🛠️ Tech Stack

### Frontend
- ⚛️ React with TypeScript
- 🏃‍♂️ Vite for blazing fast development
- 💅 TailwindCSS for styling
- 🎨 Shadcn UI Components for beautiful UI elements

### Backend
- ⚡ FastAPI for high-performance API
- 🧠 TensorFlow for AI model inference
- 🖼️ Python Image Processing
- 💭 Google Gemini for AI insights generation

## 🤝 Contact & Support

Having issues or questions? Reach out to me at [arittrabag@gmail.com](mailto:arittrabag@gmail.com).
