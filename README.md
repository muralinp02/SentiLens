# SentiLens – Interpretable Sentiment Analysis Web Application

SentiLens is an AI-powered sentiment analysis web application that classifies text into positive or negative sentiment while providing interpretable insights into model predictions.

Unlike basic sentiment classifiers that only return a label, SentiLens enhances transparency by displaying confidence scores and highlighting key contributing words that influenced the prediction.

---

## 🚀 Features

- Real-time sentiment prediction (Positive / Negative)
- Confidence score visualization
- Keyword-based interpretability (top contributing words)
- Clean and responsive web interface
- Recent analysis tracking
- Simulated live alerts for real-time experience

---

## 🧠 Machine Learning Pipeline

1. **Text Preprocessing**
   - Lowercasing
   - Stopword removal (NLTK)
   - Lemmatization

2. **Feature Extraction**
   - TF-IDF Vectorization

3. **Model**
   - Logistic Regression / Naive Bayes

4. **Prediction Output**
   - Sentiment label
   - Confidence score
   - Top contributing words

---

## 📊 Model Performance

- Accuracy: ~88.8%
- Dataset Size: ~10,000 samples
- Balanced classification for positive and negative classes

---

## 🛠 Tech Stack

- Python
- Flask
- Scikit-learn
- NLTK
- HTML, CSS, JavaScript

---

## 📂 Project Structure
SentiLens/
│
├── app.py
├── train_model.py
├── requirements.txt
│
├── model/
│ ├── sentiment_model.pkl
│ └── tfidf_vectorizer.pkl
│
├── static/
│ ├── style.css
│ └── script.js
│
├── templates/
│ └── index.html
│
└── utils/
└── preprocess.py


---

## ⚙️ Setup Instructions

Clone the repository and run locally:

```bash
git clone https://github.com/muralinp02/SentiLens.git
cd SentiLens

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
python app.py

👤 Author

Murali N P
