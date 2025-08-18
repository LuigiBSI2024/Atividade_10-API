// api/pexels.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Faltando parâmetro ?query=" });
  }

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=8`, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY, // 🔑 chave escondida no .env
      },
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar imagens", details: error.message });
  }
}
