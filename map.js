const map = L.map('map').setView([-20.3, -40.3], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

Papa.parse(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1P5nIpyQzFnInggNQAlQxf5kbpR5bf-ywZ5hcdOkgG1qsW6OQHhLef-i4xtDPERH5pF7NEAYM0vMs/pub?output=csv',
  {
    download: true,
    header: true,
    complete: function (results) {
      results.data.forEach(item => {
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);

        if (!lat || !lng) return;

        let html = `
          let html = `
  <div class="card">
    <h3>${item.nome}</h3>
    <small>${item.cidade}</small>

    <p class="selo">Estabelecimento parceiro VDS</p>

    <p>${item.descricao}</p>
`;

        if (item.vinicola) {
  html += `<h4>${item.vinicola}</h4>`;
}

if (item.rotulos) {
  html += `<div class="galeria">`;

  item.rotulos.split('|').forEach(img => {
    html += `<img src="${img.trim()}" />`;
  });
if (item.instagram) {
  html += `
    <p style="margin-top:8px;">
      <a href="${item.instagram}" target="_blank">
        📲 Instagram do estabelecimento
      </a>
    </p>
  `;
}

  html += `</div>`;
}


          item.rotulos.split('|').forEach(img => {
            html += `<img src="${img.trim()}" />`;
          });

          html += `</div>`;
        }

        html += `</div>`;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(html);
      });
    }
  }
);
