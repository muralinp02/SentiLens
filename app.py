from flask import Flask, render_template, request, jsonify
import joblib
from utils.preprocess import clean_text

app = Flask(__name__)

# Load model
model = joblib.load("model/sentiment_model.pkl")
vectorizer = joblib.load("model/tfidf_vectorizer.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "Please enter some text."}), 400

    # 🔥 Apply same preprocessing as training
    cleaned_text = clean_text(text)
    text_vector = vectorizer.transform([cleaned_text])

    prediction = model.predict(text_vector)[0]
    probabilities = model.predict_proba(text_vector)[0]
    confidence = float(max(probabilities) * 100)

    # Explainability
    feature_names = vectorizer.get_feature_names_out()
    vector_data = text_vector.toarray()[0]

    word_scores = []

    for i in range(len(vector_data)):
        if vector_data[i] > 0:
            word_scores.append((feature_names[i], vector_data[i]))

    word_scores = sorted(word_scores, key=lambda x: x[1], reverse=True)
    top_words = [word for word, score in word_scores[:5]]

    return jsonify({
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "top_words": top_words
    })

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/stats", methods=["GET"])
def stats():
    import pandas as pd

    df = pd.read_csv("data/dataset.csv")

    counts = df["sentiment"].value_counts().to_dict()

    return jsonify(counts)