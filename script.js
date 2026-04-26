// 1. Selecionar os elementos do HTML
const fotoInput = document.getElementById('fotoInput');
const preview = document.getElementById('preview');
const gpsStatus = document.getElementById('gpsStatus');
const btnEnviar = document.getElementById('btnEnviar');

// 2. Variáveis para guardar os dados globais
let localizacaoAtual = { lat: null, lng: null };

// 3. Escutar quando o usuário tira a foto
//change soa um disparo ao tirar a foto
fotoInput.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
        // Mostrar o nome da foto no preview ou previsualizara imagem
        preview.innerHTML = `✅ Foto capturada: <strong>${arquivo.name}</strong>`;
        
        // Assim que tirar a foto, vamos buscar o GPS
        obterLocalizacao();
    }
});

// 4. Função para aceder ao GPS do dispositivo
function obterLocalizacao() {
    gpsStatus.innerHTML = "📍 A localizar... aguarde.";

    // Verificar se o navegador suporta Geolocalização
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Sucesso: Guardar coordenadas
                localizacaoAtual.lat = position.coords.latitude;
                localizacaoAtual.lng = position.coords.longitude;

                gpsStatus.innerHTML = `✅ Localizado: ${localizacaoAtual.lat.toFixed(5)}, ${localizacaoAtual.lng.toFixed(5)}`;
                
                // Ativar o botão de enviar agora que temos Foto + GPS
                btnEnviar.disabled = false;
                btnEnviar.style.backgroundColor = "#2d6a4f";
            },
            (error) => {
                // Erro: Usuário negou ou GPS desligado
                gpsStatus.innerHTML = "❌ Erro ao obter localização. Ative o GPS.";
                console.error(error);
            }
        );
    } else {
        gpsStatus.innerHTML = "❌ O seu navegador não suporta GPS.";
    }
}

// 5. Simular o envio do Relato
btnEnviar.addEventListener('click', () => {
    alert(`Relato enviado com sucesso!\nLat: ${localizacaoAtual.lat}\nLng: ${localizacaoAtual.lng}`);
    // Aqui no futuro ligaremos ao Banco de Dados (Firebase)
});

/*
// Inicializa o mapa focado em uma coordenada (ex: Luanda)
const map = L.map('mapa').setView([-8.839, 13.289], 13);

// Adiciona o desenho do mapa (OpenStreetMap)
L.tileLayer('https://openstreetmap.org{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Função para adicionar um ponto de lixo
function adicionarPontoLixo(lat, lng, descricao) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>Lixo Reportado</b><br>${descricao}<br><button onclick="marcarComoLimpo()">Limpar Agora</button>`);
}*/

// Exemplo de teste
adicionarPontoLixo(-8.839, 13.289, "Acúmulo de plásticos");