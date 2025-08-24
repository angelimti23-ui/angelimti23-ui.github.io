const container = document.getElementById('flower-container');

function createFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');

  // Crear pétalos - exactamente como tu original
  const petal1 = document.createElement('div');
  petal1.classList.add('petal', 'petal1');
  const petal2 = document.createElement('div');
  petal2.classList.add('petal', 'petal2');
  const petal3 = document.createElement('div');
  petal3.classList.add('petal', 'petal3');
  const petal4 = document.createElement('div');
  petal4.classList.add('petal', 'petal4');

  // Crear centro - como tu original
  const center = document.createElement('div');
  center.classList.add('center');

  // Agregar todo a la flor - tu estructura original
  flower.appendChild(petal1);
  flower.appendChild(petal2);
  flower.appendChild(petal3);
  flower.appendChild(petal4);
  flower.appendChild(center);

  // Posición horizontal aleatoria - tu código original
  flower.style.left = Math.random() * 100 + 'vw';

  // Duración aleatoria de animación - tu código original
  flower.style.animationDuration = (Math.random() * 4 + 6) + 's';

  // Posición inicial en la parte inferior - tu código original
  flower.style.bottom = '0';

  container.appendChild(flower);

  // Quitar flor después de flotar - tu código original
  setTimeout(() => {
    flower.remove();
  }, 10000);
}

// NUEVAS FLORES GRANDES - no toco tu función original
function createBigFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower', 'big-flower');
  
  // Añadir color aleatorio
  const colors = ['pink-flower', 'purple-flower', 'blue-flower'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  flower.classList.add(randomColor);

  // Crear pétalos para flor grande
  const petal1 = document.createElement('div');
  petal1.classList.add('petal', 'petal1');
  const petal2 = document.createElement('div');
  petal2.classList.add('petal', 'petal2');
  const petal3 = document.createElement('div');
  petal3.classList.add('petal', 'petal3');
  const petal4 = document.createElement('div');
  petal4.classList.add('petal', 'petal4');

  // Crear centro para flor grande
  const center = document.createElement('div');
  center.classList.add('center');

  // Agregar todo a la flor grande
  flower.appendChild(petal1);
  flower.appendChild(petal2);
  flower.appendChild(petal3);
  flower.appendChild(petal4);
  flower.appendChild(center);

  // Posición horizontal aleatoria
  flower.style.left = Math.random() * 100 + 'vw';

  // Duración más lenta para flores grandes
  flower.style.animationDuration = (Math.random() * 5 + 8) + 's';

  // Posición inicial en la parte inferior
  flower.style.bottom = '0';

  container.appendChild(flower);

  // Quitar flor después de flotar
  setTimeout(() => {
    flower.remove();
  }, 13000);
}

// Crear una nueva flor cada 400ms - más frecuente como tu original
setInterval(() => {
    for (let i = 0; i < 5; i++) createFlower();
  }, 500);

// Crear flores grandes ocasionalmente
setInterval(() => {
    if (Math.random() < 0.4) { // 40% probabilidad
      createBigFlower();
    }
  }, 2000);

// --- Música automática ---
window.addEventListener("load", () => {
    const musica = document.getElementById("musica");
  
    const playPromise = musica.play();
  
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si falla, no hace nada
      });
    }
  });