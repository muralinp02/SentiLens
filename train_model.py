import os
import joblib
import pandas as pd
from utils.preprocess import clean_text
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("data/dataset.csv")

# Input and output
X = df["text"].apply(clean_text)
y = df["sentiment"]

# Convert text into numbers
vectorizer = TfidfVectorizer(
    max_features=5000,
    ngram_range=(1, 2),
    min_df=1,
    max_df=0.95
)
X_vectorized = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression()
# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Vectorize
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train model
model.fit(X_train_vec, y_train)

# Predictions
y_pred = model.predict(X_test_vec)

# Evaluation
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("Model trained successfully!")

# Create model folder if it doesn't exist
os.makedirs("model", exist_ok=True)

# Save model and vectorizer
joblib.dump(model, "model/sentiment_model.pkl")
joblib.dump(vectorizer, "model/tfidf_vectorizer.pkl")

print("Model and vectorizer saved successfully!")

# Test with one sample
sample_text = ["This product is very good"]
sample_vector = vectorizer.transform(sample_text)
prediction = model.predict(sample_vector)

print("Sample prediction:", prediction[0])