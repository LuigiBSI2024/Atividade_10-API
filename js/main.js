// main.js - Frontend (navegador)

// Buscar categorias da API
async function fetchCategories() {
    try {
        const response = await fetch('/api/categorias');
        if (!response.ok) throw new Error('Erro ao buscar categorias');
        
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        // Fallback para categorias padrão
        return ["Natureza", "Tecnologia", "Animais", "Comida", "Esportes", "Arquitetura"];
    }
}

// Buscar imagens via API
async function fetchImages(query, perPage = 8) {
    try {
        // Chama a API via HTTP (não importação direta)
        const response = await fetch(`/api/pexels?query=${encodeURIComponent(query)}&per_page=${perPage}`);
        
        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        return { photos: [] };
    }
}

// Função para exibir imagens na galeria
function displayImages(photos, galleryId) {
    const galeria = document.getElementById(galleryId);
    if (!galeria) return;

    galeria.innerHTML = '';

    if (!photos || photos.length === 0) {
        galeria.innerHTML = '<p>Nenhuma imagem encontrada</p>';
        return;
    }

    photos.forEach((photo) => {
        const img = document.createElement("img");
        img.src = photo.src.medium;
        img.alt = `Foto por ${photo.photographer}`;
        img.title = `Foto por ${photo.photographer}`;
        img.loading = "lazy";

        img.onerror = () => img.style.display = 'none';
        galeria.appendChild(img);
    });
}

// Carregar imagens para todas as categorias
async function categoriasImagens() {
    // Busca as categorias da API
    const categories = await fetchCategories();
    
    for (let query of categories) {
        try {
            const data = await fetchImages(query, 8);
            displayImages(data.photos, 'combinar_APIs');
        } catch (error) {
            console.error("Erro ao carregar:", query, error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => categoriasImagens(), 1000);
});