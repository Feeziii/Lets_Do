// Universal Audio Setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playPopSound() {
    if (audioCtx.state === 'suspended') { audioCtx.resume(); }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

// Background Balloon Loop Controller
function startPassiveBalloons() {
    setInterval(spawnBalloon, 1200);
}

function revealMessage() {
    document.getElementById('birthdayMessage').style.display = 'block';
    triggerConfetti();
    triggerMultiplier(12);
}

function triggerMultiplier(count) {
    for(let i = 0; i < count; i++) { 
        setTimeout(spawnBalloon, i * 100); 
    }
}

function spawnBalloon() {
    const container = document.getElementById('balloonSpace');
    if (!container) return;
    
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const colors = ['#ff477e', '#ff7096', '#ffb3c1', '#ffd166', '#06d6a0', '#118ab2', '#b388ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    balloon.style.backgroundColor = randomColor;
    balloon.style.color = randomColor;
    balloon.style.left = Math.random() * 90 + 'vw';
    
    const scale = Math.random() * 0.4 + 0.7;
    balloon.style.transform = `scale(${scale})`;
    balloon.style.animationDuration = Math.random() * 4 + 5 + 's';
    
    // Interactive Pop listener
    balloon.addEventListener('click', function(e) {
        playPopSound();
        popBurst(e.clientX, e.clientY, randomColor);
        balloon.remove();
    });
    
    container.appendChild(balloon);
    setTimeout(() => { if(balloon.parentNode) balloon.remove(); }, 9000);
}

function popBurst(x, y, color) {
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.classList.add('confetti');
        p.style.backgroundColor = color;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 40;
        p.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        p.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        
        p.style.animation = 'burst 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }
}

function triggerConfetti() {
    const colors = ['#ffffff', '#ffb3c1', '#ffd166', '#06d6a0', '#ff477e'];
    for (let i = 0; i < 70; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 2 + 1.5 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3500);
    }
   
}