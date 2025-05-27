document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".judul-animasi");
  const text = h1.textContent;
  h1.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    span.style.display = "inline-block";
    span.style.transform = "translateY(-30px)";
    span.style.animation = `hurufMasuk 0.5s forwards ${i * 0.1}s`;
    h1.appendChild(span);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".judul-animasiMeksiko");
  const text = h1.textContent;
  h1.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    span.style.display = "inline-block";
    span.style.transform = "translateY(30px)";
    span.style.animation = `hurufMasuk 0.5s forwards ${i * 0.3}s`;
    h1.appendChild(span);
  });
});

const model = document.querySelector('.taco3d');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Ubah kamera orbit berdasarkan scroll
    const theta = scrollY * 0.002;
    const phi = 70; // sudut vertikal tetap
    const radius = 100; // jarak kamera

    model.cameraOrbit = `${theta}rad ${phi}deg ${radius}m`;
});