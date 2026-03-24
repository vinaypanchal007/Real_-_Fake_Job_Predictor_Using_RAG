# Fake Job Detection System (ML + RAG Ready)

A full-stack web application that detects whether a job posting is real or fake using machine learning, with future support for RAG-based explanations using Gemini API.

---

## Features

- Detect fake job postings using a machine learning model
- Logistic Regression with TF-IDF and feature engineering
- Confidence score output
- Explanation output (RAG-ready)
- Full-stack architecture (React, Node.js, Python)
- Clean UI using Tailwind CSS

---

## Tech Stack

### Frontend
- React.js
- Axios
- Tailwind CSS

### Backend
- Node.js (Express)
- REST API

### Machine Learning
- Python (Flask)
- Scikit-learn
- TF-IDF Vectorization
- SMOTE

---

## Project Structure

```
Fake Job RAG Predictor
│
├── client/                # React frontend
│   ├── public/
|   |   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── setupTests.js
│   │   └── reportWebVitals.js
│   └── package.json
│   └── package-lock.json
│   └── readme.md
│
├── server.js              # Node backend API
├── package.json           # Backend dependencies
├── package-lock.json
├── app.py                 # Flask ML API
├── fake_job_model.joblib  # Model
├── rag_predict.py
├── Train.py
└── requirements.txt       # Python dependencies
```

---

## ML Pipeline

- Text preprocessing
- TF-IDF vectorization
- Feature stacking (categorical and numerical features)
- SMOTE for class imbalance handling
- Logistic Regression classifier
- Threshold tuning for optimal F1 score

---
