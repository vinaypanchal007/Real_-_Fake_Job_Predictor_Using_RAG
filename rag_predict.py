import joblib
import pandas as pd
import ollama

model = joblib.load("fake_job_model.joblib")

def prepare_input(job_data: dict):
    df = pd.DataFrame([job_data])

    expected_cols = [
        "combined_text", "location", "department", "employment_type",
        "required_experience", "required_education",
        "industry", "function",
        "salary_min", "salary_max",
        "telecommuting", "has_company_logo", "has_questions"
    ]

    for col in expected_cols:
        if col not in df.columns:
            if col in ["salary_min", "salary_max",
                       "telecommuting", "has_company_logo", "has_questions"]:
                df[col] = 0
            else:
                df[col] = "Unknown"

    return df[expected_cols]

def predict_job(job_data: dict):
    df = prepare_input(job_data)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    label = "FAKE JOB " if prediction == 1 else "REAL JOB "

    return label, probability

def extract_signals(job_data):
    signals = []
    text = job_data.get("combined_text", "").lower()

    if "no experience" in text:
        signals.append("No experience required")

    if "earn" in text and "weekly" in text:
        signals.append("Promises high weekly earnings")

    if "work from home" in text:
        signals.append("Work-from-home offer")

    if job_data.get("has_company_logo", 1) == 0:
        signals.append("No company logo")

    if job_data.get("salary_min", 0) == 0:
        signals.append("Missing salary details")

    if len(text.split()) < 20:
        signals.append("Very short or vague description")

    return signals

def generate_explanation(job_data, label, probability):
    signals = extract_signals(job_data)

    prompt = f"""
You are a fraud detection expert.

A machine learning model classified this job posting.

Prediction: {label}

Detected Warning Signals:
{signals}

Job Description:
{job_data.get("combined_text", "")}

Explain clearly why this job is classified this way.

Rules:
- Use bullet points
- Be precise
- Focus on suspicious patterns
"""

    try:
        response = ollama.chat(
            model="gemma:2b",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response['message']['content']

    except Exception as e:
        print("\nOllama error:", str(e))

        return f"""
Fallback Explanation:

This job is classified as {label} with probability {probability:.2f}.

Reasons:
- {', '.join(signals) if signals else 'General suspicious patterns detected'}
"""

if __name__ == "__main__":

    job_input = {
        "combined_text": "Earn $5000 weekly from home. No experience needed. Apply now!",
        "location": "Unknown",
        "department": "Unknown",
        "employment_type": "Full-time",
        "required_experience": "Entry level",
        "required_education": "High School",
        "industry": "Unknown",
        "function": "Unknown",
        "salary_min": 0,
        "salary_max": 0,
        "telecommuting": 1,
        "has_company_logo": 0,
        "has_questions": 0
    }

    label, prob = predict_job(job_input)

    print("\nPrediction:", label)
    print("Probability:", round(prob, 4))

    explanation = generate_explanation(job_input, label, prob)

    print("\nExplanation:\n")
    print(explanation)