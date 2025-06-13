// --- Inisialisasi Elemen & Variabel Game ---
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

const containerWidth = gameContainer.clientWidth;
const containerHeight = gameContainer.clientHeight;
const playerWidth = player.clientWidth;

let score = 0;
let playerPosition = player.offsetLeft;
let gameInterval;
let fallInterval;
let isGameOver = false;

// --- Kontrol Pemain ---
document.addEventListener('keydown', (event) => {
    if (isGameOver) return; // Jika game over, jangan gerakkan pemain

    const playerSpeed = 90;
    if (event.key === 'ArrowLeft') {
        playerPosition -= playerSpeed;
    } else if (event.key === 'ArrowRight') {
        playerPosition += playerSpeed;
    }

    // Batasi gerakan pemain agar tidak keluar layar
    if (playerPosition < 0) {
        playerPosition = 0;
    }
    if (playerPosition > containerWidth - playerWidth) {
        playerPosition = containerWidth - playerWidth;
    }

    player.style.left = playerPosition + 'px';
});

// --- Fungsi untuk Membuat Objek yang Jatuh ---
function createFallingObject() {
    if (isGameOver) return;

    const newObject = document.createElement('div');
    
    // 55% kemungkinan Taco, 25% kemungkinan Bom
    if (Math.random() < 0.55) {
        newObject.classList.add('taco');
    } else {
        newObject.classList.add('bomb');
    }
    
    // Tentukan posisi X (horizontal) acak
    const randomX = Math.floor(Math.random() * (containerWidth - 50)); // 50 adalah lebar objek
    newObject.style.left = randomX + 'px';
    newObject.style.top = '-50px'; // Mulai dari atas luar layar

    gameContainer.appendChild(newObject);
}

// --- Fungsi untuk Menggerakkan Objek & Cek Tabrakan ---
function gameLoop() {
    if (isGameOver) return;

    const fallingObjects = document.querySelectorAll('.taco, .bomb');
    
    fallingObjects.forEach(obj => {
        // Gerakkan objek ke bawah
        let topPosition = parseInt(obj.style.top);
        topPosition += 5; // Kecepatan jatuh
        obj.style.top = topPosition + 'px';

        // Cek jika objek keluar dari bawah layar
        if (topPosition > containerHeight) {
            obj.remove(); // Hapus objek agar tidak membebani game
        }

        // Cek Tabrakan (Collision Detection)
        const playerRect = player.getBoundingClientRect();
        const objRect = obj.getBoundingClientRect();

        if (
            playerRect.left < objRect.right &&
            playerRect.right > objRect.left &&
            playerRect.top < objRect.bottom &&
            playerRect.bottom > objRect.top
        ) {
            // Jika terjadi tabrakan
            if (obj.classList.contains('taco')) {
                score += 10;
                scoreDisplay.textContent = `Skor: ${score}`;
                obj.remove();
            } else if (obj.classList.contains('bomb')) {
                endGame();
            }
        }
    });
}

// --- Fungsi untuk Mengakhiri Game ---
function endGame() {
    isGameOver = true;
    clearInterval(gameInterval); // Hentikan game loop
    clearInterval(fallInterval); // Hentikan pembuatan objek baru
    
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

// --- Mulai Game ---
function startGame() {
    // Jalankan game loop setiap ~16ms (sekitar 60 frame per detik)
    gameInterval = setInterval(gameLoop, 16); 
    // Buat objek baru setiap 1 detik (1000ms)
    fallInterval = setInterval(createFallingObject, 1000);
}

// Panggil fungsi untuk memulai game saat script dimuat
startGame();