const map = L.map('map').setView([-20.3, -40.3], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR1P5nIpyQzFnInggNQAlQxf5kbpR5bf-ywZ5hcdOkgG1qsW6OQHhLef-i4xtDPERH5pF7NEAYM0vMs/pub?output=csv')
  .then(response => response.text())
  .then(csv => {
    const linhas = csv.split('\n');
    const cabecalho = linhas[0].split(',');

    for (let i = 1; i < linhas.length; i++) {
      if (!linhas[i]) continue;

      const dados = linhas[i].split(',');

      const item = {};
      cabecalho.forEach((coluna, index) => {
        item[coluna.trim()] = dados[index]?.trim();
      });

      const lat = parseFloat(item.lat);
      const lng = parseFloat(item.lng);

      if (isNaN(lat) || isNaN(lng)) return;

      let html = `
        <div class="card">
          <h3>${item.nome}</h3>
          <small>${item.cidade}</small>
          <p>${item.descricao}</p>
      `;

      if (item.vinicola && item.rotulos) {
        html += `<h4>${item.vinicola}</h4><div class="galeria">`;

        const imagens = item.rotulos.split('|');
        imagens.forEach(img => {
          html += `<img src="${img.trim()}" />`;
        });

        html += `</div>`;
      }

      html += `</div>`;

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(html);
    }
  });
