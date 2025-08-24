document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let current = 0;
  let autoPlayInterval;
  let isTransitioning = false; // Prevenir clicks múltiples durante transición

  function showSlide(index) {
    // Validar que el índice esté en rango
    if (index < 0 || index >= slides.length) {
      console.error("Índice fuera de rango:", index);
      return;
    }

    slides.forEach((slide, i) => {
      slide.classList.remove("activo");
      if (i === index) {
        slide.classList.add("activo");
      }
    });
    
    current = index; // Asegurar sincronización
    console.log("Mostrando slide:", current); // Debug
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const newIndex = (current + 1) % slides.length;
    showSlide(newIndex);
    
    setTimeout(() => {
      isTransitioning = false;
    }, 300); // Tiempo de la transición CSS
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // CORRECCIÓN PRINCIPAL: Manejo mejorado del índice negativo
    const newIndex = current === 0 ? slides.length - 1 : current - 1;
    showSlide(newIndex);
    
    setTimeout(() => {
      isTransitioning = false;
    }, 300);
  }

  // Auto-play cada 4 segundos
  function startAutoPlay() {
    stopAutoPlay(); // Limpiar cualquier intervalo existente
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Event listeners con mejor manejo
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      prevSlide();
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000); // Tiempo aumentado para mejor UX
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      nextSlide();
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000);
    });
  }

  // Navegación con teclado mejorada
  document.addEventListener("keydown", (e) => {
    // Solo procesar si no hay elementos de input enfocados
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    switch(e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prevSlide();
        stopAutoPlay();
        setTimeout(startAutoPlay, 3000);
        break;
      case "ArrowRight":
        e.preventDefault();
        nextSlide();
        stopAutoPlay();
        setTimeout(startAutoPlay, 3000);
        break;
    }
  });

  // Soporte mejorado para touch en móviles
  let startX = 0;
  let endX = 0;
  let startY = 0;
  let endY = 0;

  const carruselContainer = document.querySelector(".carrusel");
  
  if (carruselContainer) {
    carruselContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    carruselContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const differenceX = startX - endX;
      const differenceY = startY - endY;

      // Solo procesar swipe horizontal si es más pronunciado que el vertical
      if (Math.abs(differenceX) > Math.abs(differenceY) && Math.abs(differenceX) > 50) {
        e.preventDefault();
        
        if (differenceX > 0) {
          nextSlide(); // Swipe left = siguiente
        } else {
          prevSlide(); // Swipe right = anterior
        }
        stopAutoPlay();
        setTimeout(startAutoPlay, 3000);
      }
    }, { passive: false });

    // Pausar auto-play cuando se hace hover
    carruselContainer.addEventListener("mouseenter", stopAutoPlay);
    carruselContainer.addEventListener("mouseleave", startAutoPlay);
  }

  // Manejo de visibilidad de la página
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Inicializar solo si hay slides
  if (slides.length > 0) {
    showSlide(0);
    startAutoPlay();
    console.log(`Carrusel inicializado con ${slides.length} slides`);
  } else {
    console.error("No se encontraron slides");
  }
});

// --- Música automática mejorada ---
window.addEventListener("load", () => {
  const musica = document.getElementById("musica");
  
  if (!musica) {
    console.log("Elemento de música no encontrado");
    return;
  }

  // Configurar volumen inicial
  musica.volume = 0.5;

  // Intentar reproducir automáticamente
  const playPromise = musica.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Música iniciada automáticamente");
      })
      .catch((error) => {
        console.log("Auto-play bloqueado por el navegador:", error.message);
        
        // Crear botón de play manual si auto-play falla
        createManualPlayButton();
      });
  }

  // Función para crear botón de play manual
  function createManualPlayButton() {
    const playBtn = document.createElement("button");
    playBtn.id = "btnMusica";
    playBtn.innerHTML = "🎵 Reproducir música";
    playBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(45deg, #ff66b2, #e91e63);
      color: white;
      border: none;
      padding: 12px 18px;
      border-radius: 50px;
      font-size: 1em;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      z-index: 999;
      transition: all 0.3s ease;
    `;

    playBtn.addEventListener("click", () => {
      musica.play().then(() => {
        playBtn.remove(); // Remover botón después del click
      }).catch((error) => {
        console.error("Error al reproducir música:", error);
      });
    });

    document.body.appendChild(playBtn);
  }
});