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
async function imagensFastFood() {
  console.log("Carregando imagens de fast food...");
  
  try {
    const data = await fetchImages('hamburger', 8);
    displayImages(data.photos, 'galeria');
  } catch (error) {
    console.error("Erro ao carregar fast food:", error);
    displayError('galeria', error);
  }
}

async function categoriasImagens() {
  console.log("Carregando imagens de bebidas...");
  
  try {
    const data = await fetchImages('soda', 8);
    displayImages(data.photos, 'galeria2');
  } catch (error) {
    console.error("Erro ao carregar bebidas:", error);
    displayError('galeria2', error);
  }
}

// Função genérica para buscar qualquer tipo de imagem
async function buscarImagens(query, galleryId = 'galeria') {
  try {
    const data = await fetchImages(query, 8);
    displayImages(data.photos, galleryId);
  } catch (error) {
    console.error(`Erro ao buscar ${query}:`, error);
    displayError(galleryId, error);
  }
}

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM carregado, iniciando aplicação...");
  
  // Configurar evento do WhatsApp
  const link_desabilitado = document.getElementById("linkZap");
  if (link_desabilitado) {
    link_desabilitado.addEventListener("click", reconher_evento);
  }
  
  // Carregar imagens após um delay
  setTimeout(() => {
    categoriasImagens();
  }, 1000);
  
  // Configurar busca se existir
  const busca = document.getElementById('busca');
  if (busca) {
    busca.addEventListener('input', function() {
      const termo = this.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const nome = card.querySelector('h3');
        if (nome && nome.textContent.toLowerCase().includes(termo)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Configurar busca de imagens dinâmica (se existir)
  const imageBusca = document.getElementById('image-search');
  if (imageBusca) {
    imageBusca.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          buscarImagens(query, 'galeria-dinamica');
        }
      }
    });
  }
});
