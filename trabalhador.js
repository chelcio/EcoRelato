// 1. Selecionar os elementos do HTML
const fotoInput = document.getElementById('fotoInput');
const preview = document.getElementById('preview');
const gpsStatus = document.getElementById('gpsStatus');
const btnEnviar = document.getElementById('btnEnviar');

// 2. Variáveis globais
let localizacaoAtual = { lat: null, lng: null };
let marcadorAtual = null; // Para guardar o marcador no mapa

// 3. Inicializar o Mapa (Focado inicialmente num ponto padrão)
var map = L.map('mapa').setView([-8.839, 13.289], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 4. Escutar quando o usuário tira a foto
fotoInput.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
        preview.innerHTML = `✅ Foto capturada: <strong>${arquivo.name}</strong>`;
        obterLocalizacao(); // Chama o GPS assim que a foto é tirada
    }
});

// 5. Função para aceder ao GPS e atualizar o mapa
function obterLocalizacao() {
    gpsStatus.innerHTML = "📍 A localizar... aguarde.";

    if ("geolocation" in navigator) {
        // watchPosition pode ser usado para tempo real, mas getCurrentPosition é melhor para economizar bateria
        navigator.geolocation.getCurrentPosition(
            (position) => {
                localizacaoAtual.lat = position.coords.latitude;
                localizacaoAtual.lng = position.coords.longitude;

                gpsStatus.innerHTML = `✅ Localizado: ${localizacaoAtual.lat.toFixed(5)}, ${localizacaoAtual.lng.toFixed(5)}`;
                
                // --- NOVIDADE: Atualizar o Mapa ---
                // Move a camera do mapa para a posição do usuário
                map.setView([localizacaoAtual.lat, localizacaoAtual.lng], 17);

                // Adiciona ou move o marcador
                if (marcadorAtual) {
                    marcadorAtual.setLatLng([localizacaoAtual.lat, localizacaoAtual.lng]);
                } else {
                    marcadorAtual = L.marker([localizacaoAtual.lat, localizacaoAtual.lng]).addTo(map);
                }
                marcadorAtual.bindPopup("<b>Você está aqui!</b><br>Local do relato.").openPopup();
                // ----------------------------------

                btnEnviar.disabled = false;
                btnEnviar.style.backgroundColor = "#2d6a4f";
            },
            (error) => {
                gpsStatus.innerHTML = "❌ Erro ao obter localização. Ative o GPS.";
                console.error("Erro de Geolocation:", error);
            },
            { enableHighAccuracy: true } // Força o uso do GPS de alta precisão
        );
    } else {
        gpsStatus.innerHTML = "❌ O seu navegador não suporta GPS.";
    }
}

// 6. Simular o envio do Relato
btnEnviar.addEventListener('click', () => {
    alert(`Relato enviado com sucesso!\nLat: ${localizacaoAtual.lat}\nLng: ${localizacaoAtual.lng}`);
});
