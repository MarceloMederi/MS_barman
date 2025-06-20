const pages = document.querySelectorAll('.catalog-page');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
let currentPageIndex = 0;

// Atualiza o total de páginas ao carregar
totalPagesSpan.textContent = pages.length;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove('active');
    if (i === index) {
      page.classList.add('active');
    }
  });
  currentPageIndex = index;
  currentPageSpan.textContent = currentPageIndex + 1;
  updateButtons();
}

function updateButtons() {
  prevButton.disabled = currentPageIndex === 0;
  nextButton.disabled = currentPageIndex === pages.length - 1;
}

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

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevButton.click();
  } else if (e.key === 'ArrowRight') {
    nextButton.click();
  } else if (e.key === 'Escape') { // Adiciona suporte para fechar a imagem em tela cheia
    const fullscreenImage = document.querySelector('img[style*="position: fixed"]');
    if (fullscreenImage) {
      document.body.removeChild(fullscreenImage);
    }
  }
});

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

  fullscreenImage.addEventListener('click', () => {
    document.body.removeChild(fullscreenImage);
  });

  document.body.appendChild(fullscreenImage);
}

pages.forEach(page => {
  page.addEventListener('click', () => openFullscreenImage(page));
});

showPage(0);