const pages = document.querySelectorAll('.catalog-page');
const prevButton = document.querySelector('.prev-button'); // Continua selecionando a classe
const nextButton = document.querySelector('.next-button'); // Continua selecionando a classe
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
let currentPageIndex = 0;

// Atualiza o total de páginas ao carregar
totalPagesSpan.textContent = pages.length;

/**
 * Exibe a página do catálogo com o índice especificado.
 * @param {number} index - O índice da página a ser exibida.
 */
function showPage(index) {
  // Esconde todas as páginas
  pages.forEach((page, i) => {
    page.classList.remove('active');
    if (i === index) {
      page.classList.add('active'); // Exibe a página atual
    }
  });
  currentPageIndex = index;
  currentPageSpan.textContent = currentPageIndex + 1; // +1 porque o índice é baseado em zero
  updateButtons();
}

/**
 * Atualiza o estado dos botões de navegação (habilitado/desabilitado).
 */
function updateButtons() {
  prevButton.disabled = currentPageIndex === 0;
  nextButton.disabled = currentPageIndex === pages.length - 1;
}

// Event listeners para os botões de navegação
prevButton.addEventListener('click', () => {
  if (currentPageIndex > 0) {
    showPage(currentPageIndex - 1);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPageIndex < pages.length - 1) {
    showPage(currentPageIndex + 1);
  }
});

// Adiciona suporte a navegação por teclado (setas esquerda/direita)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevButton.click();
  } else if (e.key === 'ArrowRight') {
    nextButton.click();
  }
});

// Função para abrir a imagem em tela cheia
function openFullscreenImage(imgElement) {
  const fullscreenImage = document.createElement('img');
  fullscreenImage.src = imgElement.src;
  fullscreenImage.style.position = 'fixed';
  fullscreenImage.style.top = '0';
  fullscreenImage.style.left = '0';
  fullscreenImage.style.width = '100%';
  fullscreenImage.style.height = '100%';
  fullscreenImage.style.objectFit = 'contain';
  fullscreenImage.style.zIndex = '1000';
  fullscreenImage.style.cursor = 'pointer';

  // Adiciona um evento de clique para sair do modo de tela cheia
  fullscreenImage.addEventListener('click', () => {
    document.body.removeChild(fullscreenImage);
  });

  document.body.appendChild(fullscreenImage);
}

// Adiciona o evento de clique a cada imagem
pages.forEach(page => {
  page.addEventListener('click', () => openFullscreenImage(page));
});

// Inicializa a exibição na primeira página quando o script é carregado
showPage(0);