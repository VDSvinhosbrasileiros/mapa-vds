const map = L.map('map').setView([-20.3, -40.3], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

fetch('dados.json')
  .then(response => response.json())
  .then(dados => {
    dados.forEach(local => {

      let html = `
        <div class="card">
          <h3>${local.nome}</h3>
          <small>${local.cidade}</small>
          <p>${local.descricao}</p>
      `;

      local.vinicolas.forEach(v => {
        html += `<h4>${v.nome}</h4><div class="galeria">`;
        v.rotulos.forEach(img => {
          html += `<img src="${img}" />`;
        });
        html += `</div>`;
      });

      html += `</div>`;

      L.marker([local.lat, local.lng])
        .addTo(map)
        .bindPopup(html);
    });
  });
