// --- Efecto I LOVE YOU que cae desde arriba ---
document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.classList.add("iloveyou-container");
  document.body.appendChild(container);

  const words = [
    "TE AMO", "LESLIE", "FELIZ CUMPLEAÑOS", "💕", "❤️", "🎂", "🌟", "✨"
  ];

  const colors = [
    "#ff69b4", "#ff1493", "#ffc0cb", "#ff8fab", "#f06292", "#e91e63"
  ];

  let isPageVisible = true;

  function createWord() {
    if (!isPageVisible) return;

    const word = document.createElement("span");
    const randomWord = words[Math.floor(Math.random() * words.length)];
    word.textContent = randomWord;

    const color = colors[Math.floor(Math.random() * colors.length)];
    word.style.color = color;
    word.style.left = Math.random() * 95 + "vw";
    word.style.animationDuration = (3000 + Math.random() * 4000) + "ms";
    word.classList.add("iloveyou-word");
    
    container.appendChild(word);

    // Eliminar palabra después de la animación
    setTimeout(() => {
      if (word.parentNode) {
        word.remove();
      }
    }, 7000);
  }

  // Crear palabras cada 400ms
  setInterval(() => {
    if (Math.random() < 0.7) { // 70% probabilidad
      createWord();
    }
  }, 400);

  // Pausar cuando la página no es visible
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });
});

// --- Efectos especiales del pastel ---
document.addEventListener("DOMContentLoaded", () => {
  const cake = document.querySelector('.cake');
  const buttons = document.querySelectorAll('.buttons button');
  
  // Efecto especial al hacer click en el pastel
  cake.addEventListener('click', () => {
    // Crear explosión de emojis
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createSpecialEmoji();
      }, i * 100);
    }
    
    // Efecto de brillo en el pastel
    cake.style.filter = 'drop-shadow(0 10px 30px rgba(255, 105, 180, 0.8))';
    setTimeout(() => {
      cake.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))';
    }, 2000);
  });

  function createSpecialEmoji() {
    const emojis = ['🎉', '🎈', '✨', '💖', '🌟', '🎊'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.fontSize = '24px';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '1000';
    
    // Posición cerca del pastel
    const rect = cake.getBoundingClientRect();
    emoji.style.left = (rect.left + Math.random() * rect.width) + 'px';
    emoji.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    // Animación
    emoji.style.animation = 'explode 2s ease-out forwards';
    
    document.body.appendChild(emoji);
    
    setTimeout(() => {
      emoji.remove();
    }, 2000);
  }

  // Efecto hover en botones
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(-2px)';
    });
  });
});

// Agregar keyframes para explosión
const style = document.createElement('style');
style.textContent = `
  @keyframes explode {
    0% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.5) translateY(-50px);
      opacity: 0.8;
    }
    100% {
      transform: scale(0.5) translateY(-100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// --- Música automática ---
window.addEventListener("load", () => {
  const musica = document.getElementById("musica");
  
  if (musica) {
    musica.volume = 0.7; // Volumen al 70%
    
    const playPromise = musica.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Música iniciada automáticamente en inicio");
          
          // Fade in gradual
          let currentVolume = 0;
          musica.volume = 0;
          
          const fadeIn = setInterval(() => {
            if (currentVolume < 0.7) {
              currentVolume += 0.05;
              musica.volume = Math.min(currentVolume, 0.7);
            } else {
              clearInterval(fadeIn);
            }
          }, 100);
        })
        .catch(() => {
          console.log("Auto-play bloqueado en inicio");
        });
    }

    // Manejar errores
    musica.addEventListener('error', (e) => {
      console.log("Error cargando música:", e);
    });
  }
});

// --- Efectos adicionales de interactividad ---
document.addEventListener("DOMContentLoaded", () => {
  // Efecto de entrada suave para elementos
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('p');
  const buttonsContainer = document.querySelector('.buttons');
  const cake = document.querySelector('.cake');
  
  // Animación de entrada escalonada
  const elements = [title, subtitle, buttonsContainer, cake];
  elements.forEach((element, index) => {
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.8s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200 + 500);
    }
  });

  // Crear ráfaga especial de palabras cada 10 segundos
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const container = document.querySelector('.iloveyou-container');
        if (container) {
          const word = document.createElement("span");
          word.textContent = "FELIZ CUMPLEAÑOS";
          word.style.color = "#ff69b4";
          word.style.fontSize = "28px";
          word.style.fontWeight = "bold";
          word.style.left = (Math.random() * 80 + 10) + "vw";
          word.style.animationDuration = "4s";
          word.classList.add("iloveyou-word");
          container.appendChild(word);
          
          setTimeout(() => {
            if (word.parentNode) {
              word.remove();
            }
          }, 4000);
        }
      }, i * 200);
    }
  }, 10000);
});

// Limpieza al salir de la página
window.addEventListener('beforeunload', () => {
  const words = document.querySelectorAll('.iloveyou-word');
  words.forEach(word => word.remove());
});