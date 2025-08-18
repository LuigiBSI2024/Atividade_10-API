// Banco de dados local em memória (reseta quando reinicia o servidor)
let categories = [
    "Natureza",
    "Tecnologia",
    "Animais",
    "Comida",
    "Esportes",
    "Arquitetura"
];

export default function handler(req, res) {
    if (req.method === "GET") {
        // Retorna todas as categorias
        return res.status(200).json({ categories });
    }

    if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Campo 'name' é obrigatório" });
    }

    if (categories.includes(name)) {
        return res.status(409).json({ error: "Categoria já existe" });
    }

    categories.push(name);

    return res.status(201).json({
            message: `Categoria '${name}' adicionada com sucesso.`,
            categories,
        });
    }

    if (req.method === "DELETE") {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "Faltando parâmetro ?name=" });
        }

        const index = categories.indexOf(name);

        if (index === -1) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }

        categories.splice(index, 1);

        return res.status(200).json({
            message: `Categoria '${name}' removida com sucesso.`,
            categories,
        });
    }

    return res.status(405).json({ error: "Método não permitido" });
}
