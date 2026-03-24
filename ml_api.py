from flask import Flask, request, jsonify
import joblib
import pandas as pd
import ollama

app = Flask(__name__)

model = joblib.load("fake_job_model.joblib")

def prepare_input(data):
    df = pd.DataFrame([{
        "combined_text": data.get("combined_text", ""),
        "location": data.get("location", "Unknown"),
        "department": data.get("department", "Unknown"),
        "employment_type": data.get("employment_type", "Unknown"),
        "required_experience": data.get("required_experience", "Unknown"),
        "required_education": data.get("required_education", "Unknown"),
        "industry": data.get("industry", "Unknown"),
        "function": data.get("function", "Unknown"),
        "salary_min": 0,
        "salary_max": 0,
        "telecommuting": int(data.get("telecommuting", 0)),
        "has_company_logo": int(data.get("has_company_logo", 0)),
        "has_questions": int(data.get("has_questions", 0))
    }])
    return df

def explain(data, label, prob):
    prompt = f"""
You are a fraud detection expert.

Prediction: {label}

Job:
{data.get("combined_text", "")}

Explain why this job is classified this way in bullet points.
"""

    res = ollama.chat(
        model="gemma:2b",
        messages=[{"role": "user", "content": prompt}]
    )

    return res["message"]["content"]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    combined_text = (
        data.get('title', '') + " " +
        data.get('description', '') + " " +
        data.get('requirements', '') + " " +
        data.get('company_profile', '') + " " +
        data.get('benefits', '')
    ).strip()

    if not combined_text:
        return jsonify({
            "label": "Invalid Input ",
            "probability": 0,
            "explanation": "No job data provided"
        })

    data["combined_text"] = combined_text

    df = prepare_input(data)

    pred = model.predict(df)[0]
    prob = model.predict_proba(df)[0][1]

    label = "Fake Job " if pred == 1 else "Real Job "

    explanation = explain(data, label, prob)

    return jsonify({
        "label": label,
        "probability": float(prob),
        "explanation": explanation
    })


if __name__ == "__main__":
    app.run(port=5001, debug=True)
