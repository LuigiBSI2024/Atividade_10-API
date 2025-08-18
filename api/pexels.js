// /api/pexels.js - Backend (servidor)

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Pega os parâmetros da URL (?query=natureza&per_page=8)
    const { query, per_page = 8 } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Parâmetro 'query' é obrigatório" });
    }

    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${per_page}`, 
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Pexels API retornou: ${response.status}`);
        }

        const data = await response.json();
        
        // Retorna os dados para o frontend
        res.status(200).json(data);
        
    } catch (error) {
        console.error("Erro na API Pexels:", error);
        res.status(500).json({ 
            error: "Erro ao buscar imagens",
            details: error.message 
        });
    }
}