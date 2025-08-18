import { categories_para_o_main } from '../api/categorias_api_criada_localmente.js';
import { handler } from '../api/pexels.js';

async function fetchImages(query, perPage = 8) {
  try {
    let data = handler(res, query, perPage);

    return data;
  } 
  
  catch (error) {
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

  photos.forEach((photo, index) => {
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
  for (let query of categories_para_o_main) {
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
