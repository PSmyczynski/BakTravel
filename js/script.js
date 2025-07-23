document.addEventListener('DOMContentLoaded', () => {
  // Nawigacja mobilna
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Zamykanie menu po kliknięciu w link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Formularz zapisu
  const signupForm = document.getElementById('signupForm');
  const signupEntries = document.getElementById('signupEntries');

  const saved = JSON.parse(localStorage.getItem('baktravel_signups') || '[]');

  saved.forEach((entry, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${entry.name} (${entry.email}) ${entry.grill ? '• bierze coś na grill' : ''}
      <button class="delete-entry" data-index="${i}">Usuń</button>
    `;
    signupEntries?.appendChild(li);
  });

  signupEntries?.addEventListener('click', e => {
    if (e.target.classList.contains('delete-entry')) {
      const index = parseInt(e.target.dataset.index);
      saved.splice(index, 1);
      localStorage.setItem('baktravel_signups', JSON.stringify(saved));
      location.reload();
    }
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
    li.innerHTML = `
      ${cz.name} (${cz.email}) ${cz.grill ? '• bierze coś na grill' : ''}
      <button class="delete-entry" data-index="${saved.length - 1}">Usuń</button>
    `;
    signupEntries?.appendChild(li);

    signupForm.reset();
    alert('Zapisano! Do zobaczenia na wyprawie 😊');
  });

  if (document.getElementById('map')) {
    initMap();
  }

  if (document.getElementById('contactMap')) {
    initContactMap();
  }
});

function initMap() {
  const destination = [50.8662, 16.7168];
  const map = L.map('map').setView(destination, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(destination).addTo(map)
    .bindPopup('Cel wyprawy – Ślęża ⛰️')
    .openPopup();
}

function initContactMap() {
  const contactMap = L.map('contactMap').setView([51.233639, 17.112167], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(contactMap);

  L.marker([51.233639, 17.112167]).addTo(contactMap)
    .bindPopup('Tu nas znajdziesz! 📍')
    .openPopup();
}
