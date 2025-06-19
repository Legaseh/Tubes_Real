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
  

  // Navigasi card (slider) pencetan kiri kanan
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
  const containerCard = document.getElementById("card-container"); 
  if (containerCard) {
    fetch("Data_Restoran.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`errror ${response.status}`);
        }
        return response.json();
      })
      .then((restoranData) => {
        if (Array.isArray(restoranData)) {
          restoranData.forEach((data) => {
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


// scroll buat taco sm navbar
const tacoMuter = document.querySelector(".taco3d"); 
if (tacoMuter) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const theta = scrollY * 0.002;
    const phi = 70; 
    const radius = 100; 
    if (tacoMuter.cameraOrbit !== undefined) {
        tacoMuter.cameraOrbit = `${theta}rad ${phi}deg ${radius}m`;
    } else if (tacoMuter.setAttribute) { 
        tacoMuter.setAttribute("camera-orbit", `${theta}rad ${phi}deg ${radius}m`);
    }
  });
}

const navbar = document.querySelector("#navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    navbar.style.transform = "translateY(-110%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
});

const judul = document.querySelector('.nyatuin');
const header = document.querySelector('.itemHeader1');

function getRandomGambar() {
  const r = Math.floor(Math.random() * 5) + 1;
  return r
}


function gantiGambarOtomatis() {
  header.style.transform = 'scale(1.5)';
  header.style.opacity = '0';
  setTimeout(() => {
    header.style.backgroundImage = `url(Gambar_Ganti/makan${getRandomGambar()}.jpg)`;
    header.style.transform = 'scale(0.5)';
    
    setTimeout(() => {
      header.style.opacity = '1';
      header.style.transform = 'scale(1)';
    }, 50);
  }, 500);
};
setInterval(gantiGambarOtomatis, 3000);

const sejarah = document.querySelector(".flip-card-front")
sejarah.addEventListener("mouseenter", () => {
  sejarah.style.backgroundImage = `url(Gambar_Tempat/gambar${getRandomGambar()}.jpg)`;
})



const kirim = document.querySelector("#submit")
if (kirim){
  kirim.addEventListener("click",()=>{
    alert("Terima Kasih")
  })
}

const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});


const shuss = document.querySelector(".kataisi");
const cardhead1 = document.querySelector(".cardHeader01");
const cardhead2 = document.querySelector(".cardHeader02");
const cardhead3 = document.querySelector(".cardHeader03");
const cardhead4 = document.querySelector(".cardHeader04");
const isinyashuss = document.querySelector(".isikata");
const katacard = document.querySelector(".katacard");

isinyashuss.addEventListener("click", () => {
  shuss.style.transform = "translateX(-200%)";
  cardhead1.style.transform = "rotate(-15deg) translateY(-210px)";
  cardhead2.style.transform = "rotate(15deg) translateY(210px)";
  cardhead3.style.transform = "rotate(-50deg) translateY(-300px)";
  cardhead4.style.transform = "rotate(40deg) translateY(210px)";
  setTimeout(() => {
    shuss.style.transform = "translateX(0%)";
    cardhead1.style.transform = "rotate(5deg) translateY(20px)";
    cardhead2.style.transform = "rotate(-9deg) translateY(20px)";
    cardhead3.style.transform = "rotate(-5deg) translateY(20px)";
    cardhead4.style.transform = "rotate(9deg) translateY(20px)";
  }, 1000); // 3 detik setelah animasi pertama
});




