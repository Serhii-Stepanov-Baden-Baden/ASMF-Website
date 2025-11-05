export default async function handler(req, res) {
  // ✅ Разрешаем CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const method = req.method;
  const { creator = "Гость", message = "Нет сообщения", personality = "default" } = req.body || {};

  switch (method) {
    case "POST":
      return res.status(200).json({
        reply: `Привет, ${creator}! Ты сказал: "${message}". Я — агент RICH (${personality}).`
      });

    case "GET":
      return res.status(200).json({
        status: "RICH активен",
        usage: "Отправь POST-запрос с полями creator, message, personality"
      });

    default:
      return res.status(405).json({ error: "Метод не поддерживается" });
  }
}
