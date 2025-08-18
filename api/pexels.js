let data;
export default async function handler(res, query, per_page = 8) {

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}`, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY, // 🔒 só no servidor
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao acessar Pexels API");
    }

    data = await response.json();
    res.status(200).json(data);

    return data;

  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ error: error.message });
  }

}
