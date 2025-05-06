// Clock_Radio
// PWA (Progressive Web App)

let timer;
let segundos = 0; // <- NOVO: contador de segundos
let interval = localStorage.getItem("interval") || 5; // Recupera intervalo salvo
let cronometroAtivo = false; // <- NOVO: controle de estado

document.getElementById("interval").value = interval; // Define valor salvo

document.getElementById("interval").addEventListener("change", function() {
    interval = this.value;
    localStorage.setItem("interval", interval); // Salva no localStorage
});

// <- NOVO: Função para formatar o tempo (HH:MM:SS)
function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
}

document.getElementById("start").addEventListener("click", function() {
    if (cronometroAtivo) return; // Evita múltiplos cliques
    cronometroAtivo = true;
    
    requestWakeLock(); // Ativa a tela ligada ao iniciar
    speak(`Iniciando cronômetro, notificações a cada ${interval} minutos.`);
    
    // <- MODIFICADO: Agora conta segundos e mostra no display
    segundos = 0; // Reseta ao iniciar
    document.getElementById("cronometro").textContent = formatarTempo(segundos);
    
    timer = setInterval(() => {
        segundos++;
        document.getElementById("cronometro").textContent = formatarTempo(segundos);
        
        // <- MODIFICADO: Fala a soma acumulada (5, 10, 15...)
        if (segundos % (interval * 60) === 0) {
            const minutosAcumulados = segundos / 60;
            speak(`${minutosAcumulados} minutos totais.`); // <- Alterado para "totais"
        }
    }, 1000); // Atualiza a cada segundo
});

document.getElementById("stop").addEventListener("click", function() {
    if (!cronometroAtivo) return;
    cronometroAtivo = false;
    
    clearInterval(timer);
    releaseWakeLock(); // Libera o wake lock
    speak(`Cronômetro parado em ${formatarTempo(segundos)}.`); // <- NOVO: fala o tempo final
});

// <- SUA FUNÇÃO speak() ORIGINAL (apenas ajuste de volume)
function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 2.0; // <- Aumentado para ser mais alto que a música
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
        console.log("Fala concluída.");
    };
    speechSynthesis.speak(utterance);
}

// Service Worker (mantido igual)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado!"))
    .catch(err => console.log("Erro ao registrar Service Worker:", err));
}

// -------------------------
// WAKE LOCK (mantido igual)
// -------------------------
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
