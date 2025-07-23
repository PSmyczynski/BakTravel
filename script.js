document.addEventListener('DOMContentLoaded', () => {
  // Nawigacja mobilna
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Formularz zapisu
  const signupForm = document.getElementById('signupForm');
  const signupEntries = document.getElementById('signupEntries');

  const saved = JSON.parse(localStorage.getItem('baktravel_signups') || '[]');
  saved.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} (${entry.email}) ${entry.grill ? '• bierze coś na grill' : ''}`;
    signupEntries?.appendChild(li);
  });

  signupForm?.addEventListener('submit', e => {
    e.preventDefault();
    const cz = {
      name: signupForm.name.value,
      email: signupForm.email.value,
      grill: signupForm.grill.checked,
      timestamp: new Date().toISOString()
    };
    saved.push(cz);
    localStorage.setItem('baktravel_signups', JSON.stringify(saved));

    const li = document.createElement('li');
    li.textContent = `${cz.name} (${cz.email}) ${cz.grill ? '• bierze coś na grill' : ''} • ${new Date(cz.timestamp).toLocaleString('pl-PL')}`;
    signupEntries.appendChild(li);

    signupForm.reset();
    alert('Zapisano! Do zobaczenia na wyprawie 😊');
  });

  // Mapa Leaflet
  if (document.getElementById('map')) {
    initMap();
  }
  if (document.getElementById('contactMap')) {
  initContactMap();
}
});
function initContactMap() {
  const contactMap = L.map('contactMap').setView([51.233639, 17.112167], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(contactMap);

  L.marker([51.233639, 17.112167]).addTo(contactMap)
    .bindPopup('Tu nas znajdziesz! 📍')
    .openPopup();
}

function initMap() {
  const destination = [50.8662, 16.7168]; // Ślęża
  const map = L.map('map').setView(destination, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(destination).addTo(map)
    .bindPopup('Cel wyprawy – Ślęża ⛰️')
    .openPopup();
}
