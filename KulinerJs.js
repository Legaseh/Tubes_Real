document.addEventListener("DOMContentLoaded", () => {
  function animateText(selector, yOffset, delayMultiplier) {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.textContent;
      element.textContent = "";

      [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = 0;
        span.style.display = "inline-block";
        span.style.transform = `translateY(${yOffset}px)`;
        span.style.animation = `hurufMasuk 0.5s forwards ${i * delayMultiplier}s`;
        element.appendChild(span);
      });
    }
  }
  animateText(".judul-animasi", -30, 0.1);
  animateText(".judul-animasiMeksiko", 30, 0.3);

  // Toggle menu navigasi
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav"); // Pastikan ini adalah .nav yang benar, bukan #navbar jika Anda mengubahnya

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Navigasi card (slider)
  const cardContainer = document.querySelector(".card-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (cardContainer && prevBtn && nextBtn) {
    const cardWidth = 325; // Lebar card + gap
    let scrollPosition = 0;

    nextBtn.addEventListener("click", () => {
      scrollPosition += cardWidth;
      if (scrollPosition > cardContainer.scrollWidth - cardContainer.clientWidth) {
        scrollPosition = cardContainer.scrollWidth - cardContainer.clientWidth;
      }
      cardContainer.style.transform = `translateX(-${scrollPosition}px)`;
    });

    prevBtn.addEventListener("click", () => {
      scrollPosition -= cardWidth;
      if (scrollPosition < 0) {
        scrollPosition = 0;
      }
      cardContainer.style.transform = `translateX(-${scrollPosition}px)`;
    });
  }

  // Fetch dan tampilkan data restoran
  const containerCard = document.getElementById("card-container"); // Ini sama dengan .card-container di atas, pastikan selector konsisten
  if (containerCard) { // Periksa apakah elemen ada
    fetch("Data_Restoran.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((restoranData) => {
        // Pastikan restoranData adalah array
        if (Array.isArray(restoranData)) {
          restoranData.forEach((data) => { // Menggunakan forEach lebih modern
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
              <div class="card-image">
                <iframe src="${data.iframeSrc}" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div class="card-content">
                <h2>${data.title}</h2>
                <h3>${data.signatureDish}</h3>
                <p>${data.description}</p>
                <a href="${data.locationLink}" class="location-link" target="_blank">View Location</a>
              </div>
            `;
            containerCard.appendChild(card);
          });
        } else {
          console.error("Data_Restoran.json tidak menghasilkan array:", restoranData);
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data restoran:", error);
      });
  }
}); 


// Model 3D Taco scroll
const tacoMuter = document.querySelector(".taco3d"); 
if (tacoMuter) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const theta = scrollY * 0.002;
    const phi = 70; // sudut vertikal tetap
    const radius = 100; // jarak kamera, pastikan ini sesuai dengan skala model Anda
    if (tacoMuter.cameraOrbit !== undefined) {
        tacoMuter.cameraOrbit = `${theta}rad ${phi}deg ${radius}m`;
    } else if (tacoMuter.setAttribute) { // Fallback jika cameraOrbit adalah atribut
        tacoMuter.setAttribute("camera-orbit", `${theta}rad ${phi}deg ${radius}m`);
    }
  });
}
