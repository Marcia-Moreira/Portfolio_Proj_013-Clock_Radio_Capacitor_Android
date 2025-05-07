// Clock_Radio
// PWA (Progressive Web App)

// =============================================
// Variáveis Globais (adicionado audioContext)
// =============================================
let timer;
let segundos = 0; // <- NOVO: contador de segundos
let interval = localStorage.getItem("interval") || 5; // Recupera intervalo salvo
let cronometroAtivo = false; // <- NOVO: controle de estado
let audioContext; // <- NOVO: para controle de volume da música
let musicGainNode; // <- NOVO: nó de ganho de áudio

// =============================================
// Configuração Inicial (adicionado setupAudioContext)
// =============================================
document.getElementById("interval").value = interval; // Define valor salvo

// Inicializa o AudioContext quando a página carrega
window.addEventListener('load', function() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        musicGainNode = audioContext.createGain();
        musicGainNode.gain.value = 1.0; // Volume normal inicial
        musicGainNode.connect(audioContext.destination);
        console.log("✅ Sistema de áudio configurado");
    } catch (e) {
        console.warn("⚠️ Não foi possível iniciar AudioContext:", e);
    }
});

// =============================================
// Event Listeners (MANTIDO IGUAL)
// =============================================
document.getElementById("interval").addEventListener("change", function() {
    interval = this.value;
    localStorage.setItem("interval", interval); // Salva no localStorage
});

// =============================================
// Funções do Cronômetro (timer agora inclui hora atual)
// =============================================
function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
}

document.getElementById("start").addEventListener("click", function() {
    if (cronometroAtivo) return;
    cronometroAtivo = true;
    
    requestWakeLock();
    speak(`Iniciando cronômetro, notificações a cada ${interval} minutos.`);
    
    segundos = 0;
    document.getElementById("cronometro").textContent = formatarTempo(segundos);
    
    timer = setInterval(() => {
        segundos++;
        document.getElementById("cronometro").textContent = formatarTempo(segundos);
        
        if (segundos % (interval * 60) === 0) {
            const minutosAcumulados = segundos / 60;
            const horaAtual = new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });
            // Agora fala tempo acumulado + hora atual
            speak(`${minutosAcumulados} minutos totais. Agora são ${horaAtual}.`);
        }
    }, 1000);
});

document.getElementById("stop").addEventListener("click", function() {
    if (!cronometroAtivo) return;
    cronometroAtivo = false;
    
    clearInterval(timer);
    releaseWakeLock();
    speak(`Cronômetro parado em ${formatarTempo(segundos)}.`);
});

// =============================================
// FUNÇÃO SPEAK() - VERSÃO NOVA (SUBSTITUI A ORIGINAL)
// =============================================
async function speak(text) {
    //! 1. Abaixa volume da música para 30% (FALHA Não está funcionando ainda)
    if (musicGainNode) {
        musicGainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    }

    // 2. Configura a fala
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1.0; // Volume máximo permitido
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // 3. Restaura volume quando terminar
    utterance.onend = () => {
        if (musicGainNode) {
            musicGainNode.gain.setValueAtTime(1.0, audioContext.currentTime);
        }
        console.log("Fala concluída.");
    };

    // 4. Cancela falas pendentes e inicia nova
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

// =============================================
// Service Worker (MANTIDO IGUAL)
// =============================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado!"))
    .catch(err => console.log("Erro ao registrar Service Worker:", err));
}

// =============================================
// WAKE LOCK (MANTIDO IGUAL)
// =============================================
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("🔒 Wake Lock ativado: tela não vai apagar.");
    } catch (err) {
        console.error(`❌ Erro ao ativar Wake Lock: ${err.name}, ${err.message}`);
    }
}

function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release().then(() => {
            console.log("🔓 Wake Lock liberado.");
            wakeLock = null;
        });
    }
}

document.addEventListener("visibilitychange", () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
        requestWakeLock();
    }
});