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
Fake Job RAG Predictor
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── index.css
│ │ └── reportWebVitals.js
│ └── package.json
│
├── server.js # Node backend API
├── package.json # Backend dependencies
│
├── app.py # Flask ML API
├── model.pkl # Trained ML model
├── vectorizer.pkl # TF-IDF vectorizer
│
└── requirements.txt # Python dependencies

---

## ML Pipeline

- Text preprocessing
- TF-IDF vectorization
- Feature stacking (categorical and numerical features)
- SMOTE for class imbalance handling
- Logistic Regression classifier
- Threshold tuning for optimal F1 score

---

## Future Improvements

- Integration with Gemini API for RAG-based explanations
- Dashboard for analytics and insights
- Resume-job matching system
- Real-time job scraping and detection

---