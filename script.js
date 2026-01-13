let totalInvestment = 0;
let totalGain = 0;
let history = [];
let chart;

function invest(type, rate, inputId) {
  const amount = Number(document.getElementById(inputId).value);
  if (amount < 10) {
    alert("Minimum investment is ₹10");
    return;
  }

  const gain = amount * rate;
  totalInvestment += amount;
  totalGain += gain;

  document.getElementById("totalInvestment").innerText = `₹${totalInvestment}`;
  document.getElementById("portfolioGain").innerText = `₹${totalGain.toFixed(2)}`;

  document.getElementById("investmentTable").innerHTML += `
    <tr>
      <td>${type}</td>
      <td>₹${amount}</td>
      <td>₹${gain.toFixed(2)}</td>
    </tr>
  `;

  history.push(totalInvestment + totalGain);
  drawChart();
  document.getElementById(inputId).value = "";
}

function drawChart() {
  const ctx = document.getElementById("portfolioChart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.map((_, i) => `Step ${i + 1}`),
      datasets: [{
        data: history,
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } }
    }
  });
}

function toggleChat() {
  const chat = document.getElementById("chatbox");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (!input.value) return;

  const body = document.getElementById("chatBody");
  body.innerHTML += `<div class="user">${input.value}</div>`;
  body.innerHTML += `<div class="bot">Start small, invest safely 👍</div>`;
  input.value = "";
  body.scrollTop = body.scrollHeight;
}

function toggleHelpline() {
  const h = document.getElementById("helpline");
  h.style.display = h.style.display === "block" ? "none" : "block";
}

/* LANGUAGE */
const translations = {
  hi: {
    user: "उपयोगकर्ता",
    dashboard: "डैशबोर्ड",
    invest: "निवेश",
    myInvest: "मेरे निवेश",
    chat: "चैट सहायता",
    how: "कैसे काम करता है",
    step1: "निवेश विकल्प चुनें",
    step2: "₹10 या अधिक डालें",
    step3: "निवेश पर क्लिक करें",
    step4: "अपनी ग्रोथ देखें",
    helpline: "सहायता",
    about: "हमारे बारे में",
    aboutText: "माइक्रो इन्वेस्ट छात्रों और ग्रामीण लोगों को कम पैसों में निवेश शुरू करने में मदद करता है।",
    totalInv: "कुल निवेश",
    gain: "लाभ",
    options: "निवेश विकल्प",
    fd: "फिक्स्ड डिपॉजिट",
    fdText: "कम जोखिम · 6% रिटर्न",
    sf: "सिक्योर फंड",
    sfText: "मध्यम जोखिम · 10% रिटर्न",
    investBtn: "निवेश करें",
    type: "प्रकार",
    amount: "राशि",
    growth: "पोर्टफोलियो ग्रोथ",
    benefits: "माइक्रो इन्वेस्ट क्यों चुनें?",
    b1: "₹10 से निवेश शुरू करें",
    b2: "आसान और सरल उपयोग",
    b3: "शुरुआती लोगों के लिए सुरक्षित",
    b4: "बचत की आदत बनाता है",
    b5: "पैसे की स्पष्ट जानकारी",
    assistant: "सहायक",
    botHi: "नमस्ते! मैं आपकी मदद कर सकता हूँ"
  }
};

function changeLanguage() {
  const lang = document.getElementById("languageToggle").value;
  if (lang === "en") location.reload();
  document.querySelectorAll("[data-key]").forEach(el => {
    el.innerText = translations[lang][el.dataset.key];
  });

};
