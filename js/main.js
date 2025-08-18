import { categories } from './categorias_api_criada_localmente.js';

async function fetchImages(query, perPage = 8) {
    try {
        const response = await fetch(`/api/pexels?query=${encodeURIComponent(query)}&per_page=${perPage}`);
        
        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        return { photos: [] }; // garante retorno vazio se falhar
    }
}


// Função para exibir imagens na galeria
function displayImages(photos, galleryId) {
  const galeria = document.getElementById(galleryId);
  
  if (!galeria) {
    console.error(`Elemento #${galleryId} não encontrado no DOM!`);
    return;
  }

  // Limpar galeria
  galeria.innerHTML = '';

  if (!photos || photos.length === 0) {
    galeria.innerHTML = '<p>Nenhuma imagem encontrada</p>';
    return;
  }

  // Adicionar cada imagem
  photos.forEach((photo, index) => {
    console.log(`Adicionando imagem ${index + 1}:`, photo.src.medium);
    
    const img = document.createElement("img");
    img.src = photo.src.medium;
    img.alt = `Foto por ${photo.photographer}`;
    img.title = `Foto por ${photo.photographer}`;
    img.loading = "lazy";
    
    // Eventos de debug
    img.onerror = function() {
      console.error(`Erro ao carregar imagem: ${this.src}`);
      this.style.display = 'none';
    };
    
    img.onload = function() {
      console.log(`Imagem carregada: ${this.src}`);
    };
    
    galeria.appendChild(img);
  });

  console.log(`${photos.length} imagens adicionadas à galeria ${galleryId}`);
}

// Função para mostrar erro na galeria
function displayError(galleryId, error) {
  const galeria = document.getElementById(galleryId);
  if (galeria) {
    galeria.innerHTML = `
      <div style="color: #ff4081; padding: 20px; text-align: center;">
        <p>⚠ Erro ao carregar imagens</p>
        <p><small>${error.message}</small></p>
        <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 10px;">
          🔄 Tentar Novamente
        </button>
      </div>
    `;
  }
}

// Funções para carregar imagens específicas
async function categoriasImagens() {
  console.log("Carregando imagens de bebidas...");
  
  let query;

  for(let i = 0; i < categories.lenght; i++){
    query = categories[i]

    try {
      const data = await fetchImages(query, 8);
      displayImages(data.photos, 'combinar_APIs');
    } 
    
    catch (error) {
      console.error("Erro ao carregar bebidas:", error);
      displayError('combinar_APIs', error);
    }
  }
}

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado, iniciando aplicação...");
  
  // Carregar imagens após um delay
    setTimeout(() => {
      categoriasImagens();
    }, 1000);
  }
);
