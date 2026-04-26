// Elementos HTML
const gpsStatus = document.getElementById("gpsStatus");
const btnEnviar = document.getElementById("btnEnviar");

// Criar mapa (APENAS UMA VEZ)
var mapa = L.map('mapa').setView([-8.839, 13.289], 13);

// Camada do mapa correta
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(mapa);

// ✅ FUNÇÃO CORRIGIDA
function obterLocalizacao() {
    const opcoes = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(sucesso, erro, opcoes);
}

// Função sucesso
function sucesso(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    gpsStatus.innerHTML = `📍 Localização Exata: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    btnEnviar.disabled = false;

    // opcional: centralizar mapa
    mapa.setView([lat, lng], 15);
}

// Função erro (faltava!)
function erro() {
    alert("Não foi possível obter a localização.");
}

// Ícone
const lixoIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565547.png', // ícone real
    iconSize: [38, 38],
});

// Marcador
function adicionarMarcador(lat, lng, info) {
    const marker = L.marker([lat, lng], {icon: lixoIcon}).addTo(mapa);
    marker.bindPopup(`<b>Alerta de Sujidade</b><br>${info}`);
}

// Teste
adicionarMarcador(-8.838, 13.285, "Lixo acumulado na berma da estrada.");
