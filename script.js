const campo = document.getElementById("campo");

function crearGirasol() {
  const girasol = document.createElement("div");
  girasol.classList.add("girasol");

  const tallo = document.createElement("div");
  tallo.classList.add("tallo");

  const centro = document.createElement("div");
  centro.classList.add("centro");

  // pétalos
  for (let i = 0; i < 8; i++) {
    const petalo = document.createElement("div");
    petalo.classList.add("petalo");
    petalo.style.transform = `rotate(${i * 45}deg) translateY(-20px)`;
    girasol.appendChild(petalo);
  }

  girasol.appendChild(centro);
  girasol.appendChild(tallo);
  campo.appendChild(girasol);
}

// Generar varios girasoles
for (let i = 0; i < 6; i++) {
  crearGirasol();
}
