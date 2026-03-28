let historyData = [];

async function analyzeText() {
    const text = document.getElementById("textInput").value;
    const resultBox = document.getElementById("result");

    if (text.trim() === "") {
        resultBox.innerHTML = `
            <div class="result-card">
                <h3>No Input Provided</h3>
                <p>Please enter some text before clicking analyze.</p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (data.error) {
            resultBox.innerHTML = `
                <div class="result-card">
                    <h3>Error</h3>
                    <p>${data.error}</p>
                </div>
            `;
            return;
        }

        const sentimentClass = data.prediction.toLowerCase();
        const topWords = (data.top_words && data.top_words.length > 0)
            ? data.top_words.join(", ")
            : "No major keywords found";

        let fillColor = "#d28b10";
        if (sentimentClass === "positive") fillColor = "#1f9d55";
        if (sentimentClass === "negative") fillColor = "#d64545";

        resultBox.innerHTML = `
            <div class="result-card ${sentimentClass}">
                <h3>Prediction: ${data.prediction}</h3>
                <span class="result-highlight">Model Response</span>
                <p><strong>Confidence Score:</strong> ${data.confidence}%</p>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: ${data.confidence}%; background: ${fillColor};"></div>
                </div>
                <p><strong>Interpretation Keywords:</strong> ${topWords}</p>
            </div>
        `;

        historyData.unshift({
            text: text,
            prediction: data.prediction,
            confidence: data.confidence
        });

        if (historyData.length > 5) {
            historyData.pop();
        }

        updateHistory();

    } catch (error) {
        resultBox.innerHTML = `
            <div class="result-card">
                <h3>Request Failed</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function updateHistory() {
    const historyDiv = document.getElementById("history");

    if (historyData.length === 0) {
        historyDiv.innerHTML = "No analysis yet.";
        historyDiv.className = "card-body empty-state";
        return;
    }

    historyDiv.className = "card-body";

    historyDiv.innerHTML = historyData.map(item => `
        <div class="history-item">
            <strong>Text:</strong> ${item.text}<br>
            <strong>Prediction:</strong> ${item.prediction}<br>
            <strong>Confidence:</strong> ${item.confidence}%
        </div>
    `).join("");
}

function startLiveAlerts() {
    const alertsDiv = document.getElementById("liveAlerts");

    const alerts = [
        "New review captured: Absolutely brilliant direction and acting.",
        "Incoming opinion: The movie was too slow and disappointing.",
        "Live sample detected: Great visuals and strong emotional depth.",
        "New text received: Poor screenplay but decent soundtrack.",
        "Real-time input: Excellent performance by the lead actor."
    ];

    let index = 0;

    function renderAlert() {
        const newAlert = `
            <div class="alert-item">
                <strong>Alert:</strong> ${alerts[index]}
            </div>
        `;

        alertsDiv.innerHTML = newAlert + alertsDiv.innerHTML;

        const items = alertsDiv.querySelectorAll(".alert-item");
        if (items.length > 5) {
            items[items.length - 1].remove();
        }

        index = (index + 1) % alerts.length;
    }

    renderAlert();
    setInterval(renderAlert, 4000);
}

window.onload = function () {
    updateHistory();
    startLiveAlerts();
};