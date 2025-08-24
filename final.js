const container = document.querySelector('.love-animation');

const words = ["I", "LOVE", "YOU", "LESLIE", "❤️", "💕", "🌟"];
const colors = [
  "#d81b60", "#e91e63", "#f06292", 
  "#ff4081", "#ff80ab", "#c2185b"
];

let wordCreationInterval;
let isPageVisible = true;

function createWord() {
  const word = document.createElement('div');
  word.classList.add('falling-word');

  // Elige una palabra al azar
  const randomWord = words[Math.floor(Math.random() * words.length)];
  word.textContent = randomWord;

  // Color aleatorio
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  word.style.color = randomColor;

  // Posición horizontal aleatoria dentro del viewport
  const leftPosition = Math.random() * 95; // 95% para evitar que se corte
  word.style.left = leftPosition + 'vw';

  // Duración aleatoria de la animación entre 6 y 12 segundos
  const duration = Math.random() * 6 + 6;
  word.style.animationDuration = duration + 's';

  // Tamaño de fuente aleatorio entre 20 y 50 px
  const fontSize = Math.random() * 30 + 20;
  word.style.fontSize = fontSize + 'px';

  // Delay aleatorio para que no todas caigan al mismo tiempo
  const delay = Math.random() * 2;
  word.style.animationDelay = delay + 's';

  container.appendChild(word);

  // Elimina la palabra después de que termine la animación
  setTimeout(() => {
    if (word.parentNode) {
      word.remove();
    }
  }, (duration + delay) * 1000);
}

function startWordAnimation() {
  // Crear una palabra cada 300-800ms de manera aleatoria
  const createWordWithRandomDelay = () => {
    if (isPageVisible) {
      createWord();
    }
    const nextDelay = Math.random() * 500 + 300;
    setTimeout(createWordWithRandomDelay, nextDelay);
  };
  
  createWordWithRandomDelay();
}

// Optimización: pausar animaciones cuando la página no es visible
document.addEventListener('visibilitychange', () => {
  isPageVisible = !document.hidden;
});

// Iniciar la animación de palabras
startWordAnimation();

// Control de música mejorado
window.addEventListener("load", () => {
  const musica = document.getElementById("musica");
  
  // Configurar volumen inicial
  if (musica) {
    musica.volume = 0.7; // Volumen al 70%
    
    // Intentar reproducir automáticamente
    const playPromise = musica.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Música iniciada automáticamente en final");
        })
        .catch(() => {
          console.log("Auto-play bloqueado en final");
        });
    }

    // Fade in suave de la música
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
  }
});

// Efectos adicionales para interactividad
document.addEventListener('mousemove', (e) => {
  // Crear ocasionalmente palabras donde está el cursor
  if (Math.random() < 0.02) { // 2% de probabilidad
    const word = document.createElement('div');
    word.classList.add('falling-word');
    word.textContent = "💖";
    word.style.color = colors[Math.floor(Math.random() * colors.length)];
    word.style.left = e.clientX + 'px';
    word.style.top = e.clientY + 'px';
    word.style.position = 'fixed';
    word.style.fontSize = '24px';
    word.style.animationDuration = '3s';
    word.style.zIndex = '1000';
    
    document.body.appendChild(word);
    
    setTimeout(() => {
      if (word.parentNode) {
        word.remove();
      }
    }, 3000);
  }
});

// Crear ráfagas especiales de palabras ocasionalmente
function createWordBurst() {
  const burstWords = ["LESLIE", "TE AMO", "💖", "FOREVER"];
  const burstCount = 5;
  
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      const word = document.createElement('div');
      word.classList.add('falling-word');
      word.textContent = burstWords[Math.floor(Math.random() * burstWords.length)];
      word.style.color = colors[Math.floor(Math.random() * colors.length)];
      word.style.left = (Math.random() * 80 + 10) + 'vw';
      word.style.fontSize = (Math.random() * 20 + 35) + 'px';
      word.style.animationDuration = (Math.random() * 4 + 4) + 's';
      word.style.fontWeight = '700';
      
      container.appendChild(word);
      
      setTimeout(() => {
        if (word.parentNode) {
          word.remove();
        }
      }, 8000);
    }, i * 200);
  }
}

// Crear ráfagas especiales cada 15-30 segundos
setInterval(() => {
  if (isPageVisible && Math.random() < 0.3) {
    createWordBurst();
  }
}, Math.random() * 15000 + 15000);

// Limpieza al salir de la página
window.addEventListener('beforeunload', () => {
  const fallingWords = document.querySelectorAll('.falling-word');
  fallingWords.forEach(word => word.remove());
});