// Para gerar Player das Rádios sem abrir a página origem e sem precisar de outro play:
const buttons = document.querySelectorAll('.radio-btn');
let currentPlayer = null;
let currentButton = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const player = document.getElementById(targetId);

    // Se clicou no mesmo botão que já está tocando, pause
    if (player === currentPlayer) {
      player.pause();
      button.classList.remove('playing');
      button.textContent = '▶️ ' + button.textContent.replace('⏸️ Pausar ', '');
      currentPlayer = null;
      currentButton = null;
    } else {
      // Pausar player anterior, se houver
      if (currentPlayer) {
        currentPlayer.pause();
        if (currentButton) {
          currentButton.classList.remove('playing');
          currentButton.textContent = '▶️ ' + currentButton.textContent.replace('⏸️ Pausar ', '');
        }
      }

      // Tocar o novo player
      player.play();
      button.classList.add('playing');
      button.textContent = '⏸️ Pausar ' + button.textContent.replace('▶️ ', '');
      currentPlayer = player;
      currentButton = button;
    }
  });
});
