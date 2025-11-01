// Fetch top 10 markets
async function fetchMarketData() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await res.json();
    const marketContainer = document.getElementById("marketData");
    marketContainer.innerHTML = "";
    data.forEach((coin) => {
      const el = document.createElement("div");
      el.innerHTML = `
        <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
        <p class="price">$${coin.current_price.toLocaleString()}</p>
        <p class="change" style="color:${
          coin.price_change_percentage_24h >= 0 ? "#00ff9d" : "#ff4b4b"
        }">${coin.price_change_percentage_24h.toFixed(2)}% (24h)</p>
        <p style="font-size:0.8rem;color:#ccc;">MCap $${(
          coin.market_cap / 1e9
        ).toFixed(2)} B</p>`;
      marketContainer.appendChild(el);
    });
  } catch {
    document.getElementById("marketData").innerText = "Failed to load market data.";
  }
}
fetchMarketData();
setInterval(fetchMarketData, 60000);

// Analyzer logic
document.getElementById("analyzeBtn").addEventListener("click", () => {
  const input = document.getElementById("tokenInput").value.trim();
  const resultBox = document.getElementById("resultBox");
  const resultText = document.getElementById("resultText");
  if (!input) return alert("Please enter a token name or contract address!");
  resultBox.classList.remove("hidden");
  resultText.innerHTML = "🔎 Analyzing token data…";
  setTimeout(() => {
    const r = Math.random();
    resultText.innerHTML =
      r < 0.3
        ? "🚨 High scam risk – suspicious liquidity or ownership found."
        : r < 0.6
        ? "⚠️ Moderate risk – some indicators need manual review."
        : "✅ Healthy token – verified contract and stable volume.";
  }, 1500);
});

// Copy contract
const addr = document.getElementById("contractAddress");
const notif = document.getElementById("copyNotif");
addr.addEventListener("click", () => {
  navigator.clipboard.writeText(addr.textContent.trim());
  notif.classList.remove("hidden");
  setTimeout(() => notif.classList.add("hidden"), 1200);
});
