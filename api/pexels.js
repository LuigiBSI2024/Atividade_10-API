export default async function handler(req, res) {
  const { query, per_page } = req.query;

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}`, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY, // 🔒 só no servidor
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao acessar Pexels API");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ error: error.message });
  }
}
