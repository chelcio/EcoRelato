function obterLocalizacao() {
    const opcoes = {
        enableHighAccuracy: true, // Força o uso do GPS de alta precisão
        timeout: 5000,            // Espera até 5 segundos pela resposta
        maximumAge: 0             // Não aceita localizações antigas (cache)
    };

    navigator.geolocation.getCurrentPosition(sucesso, erro, opcoes);
}

function sucesso(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    // Mostra no ecrã com 6 casas decimais (precisão de centímetros)
    gpsStatus.innerHTML = `📍 Localização Exata: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    
    // Ativa o botão de enviar
    btnEnviar.disabled = false;
}

// 2. Adicionar o fundo do mapa (OpenStreetMap)
var mapa = L.map('mapa').setView([-8.839, 13.289], 13);
L.tileLayer('https://openstreetmap.org{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// 3. Criar um ícone personalizado (Opcional, mas impactante)
const lixoIcon = L.icon({
    iconUrl: 'https://flaticon.com', // Ícone de lixo
    iconSize: [38, 38],
});

// 4. Função para adicionar marcadores
function adicionarMarcador(lat, lng, info) {
    const marker = L.marker([lat, lng], {icon: lixoIcon}).addTo(map);
    marker.bindPopup(`<b>Alerta de Sujidade</b><br>${info}<br><br><button style="cursor:pointer">Marcar como Limpo</button>`);
}

// 5. Simular um ponto vindo do banco de dados
adicionarMarcador(-8.838, 13.285, "Lixo acumulado na berma da estrada.");
