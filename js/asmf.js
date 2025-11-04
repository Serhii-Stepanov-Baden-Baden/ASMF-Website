window.RICH = {
  init: function (config) {
    const container = document.getElementById("rich-agent");
    if (!container) return;

    container.innerHTML = `
      <div style="padding:20px; font-family:sans-serif;">
        <h2>🤖 RICH AI Agent </h2>
        <div id="rich-output" style="margin-top:10px;"></div>
        <input id="rich-input" type="text" placeholder="Спроси у RICH..." style="width:100%; padding:10px; margin-top:10px;">
      </div>
    `;

    const input = document.getElementById("rich-input");
    const output = document.getElementById("rich-output");

    input.addEventListener("keydown", async function (e) {
      if (e.key === "Enter") {
        const message = input.value;
        output.innerHTML += `<div><strong>Ты:</strong> ${message}</div>`;
        input.value = "";

        const res = await fetch(config.endpoint + "/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creator: config.creator,
            message: message,
            memory: config.memory,
            personality: config.personality,
            driveAccount: config.driveAccount
          })
        });

        const data = await res.json();
        output.innerHTML += `<div><strong>RICH:</strong> ${data.reply}</div>`;
      }
    });
  }
};
