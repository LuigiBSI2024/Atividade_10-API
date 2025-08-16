async function imagensBebidasComuns(){
  const API_KEY = ;
  
  console.log("Iniciando carregamento de imagens...");
  
  try {
    // Fazer requisiÃ§Ã£o para a API do Pexels
    const response = await fetch('https://api.pexels.com/v1/search?query=soda&per_page=8', {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log("Status da resposta:", response.status);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);

    // Verificar se o elemento galeria existe
    const galeria = document.getElementById("galeria2");
    if (!galeria) {
      console.error("Elemento #galeria nÃ£o encontrado no DOM!");
      return;
    }

    // Limpar galeria antes de adicionar novas imagens
    galeria.innerHTML = '';

    // Verificar se existem fotos nos dados
    if (!data.photos || data.photos.length === 0) {
      console.log("Nenhuma foto encontrada nos resultados");
      galeria.innerHTML = '<p>Nenhuma imagem encontrada</p>';
      return;
    }

    // Adicionar cada imagem Ã  galeria
    data.photos.forEach((photo, index) => {
      console.log(`Adicionando imagem ${index + 1}:`, photo.src.medium);
      
      const img = document.createElement("img");
      img.src = photo.src.medium;
      img.alt = `Foto de comida por ${photo.photographer}`;
      img.title = `Foto por ${photo.photographer}`;
      
      // Adicionar evento de erro para debug
      img.onerror = function() {
        console.error(`Erro ao carregar imagem: ${this.src}`);
      };
      
      // Adicionar evento de sucesso para debug
      img.onload = function() {
        console.log(`Imagem carregada com sucesso: ${this.src}`);
      };
      
      galeria.appendChild(img);
    });

    console.log(`${data.photos.length} imagens adicionadas Ã  galeria`);

  } catch (error) {
    console.error("Erro detalhado ao carregar imagens:", error);
    
    // Mostrar erro na galeria
    const galeria = document.getElementById("galeria2");
    if (galeria) {
      galeria.innerHTML = `
        <div style="color: #ff4081; padding: 20px;">
          <p>âŒ Erro ao carregar imagens da galeria</p>
          <p><small>Detalhes: ${error.message}</small></p>
        </div>
      `;
    }
  }
}

setTimeout(() => {
    imagensBebidasComuns();
}, 1000);