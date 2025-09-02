const palavras = ['python', 'programacao', 'energia', 'tecnologia', 'sol', 'painel', 'bateria', 'luz'];
let palavra = palavras[Math.floor(Math.random() * palavras.length)];
let letrasDescobertas = Array(palavra.length).fill('_');
let letrasErradas = [];
let tentativas = 6;

const palavraEl = document.getElementById('palavra');
const letrasErradasEl = document.getElementById('letrasErradas');
const botoesEl = document.getElementById('botoes');
const canvas = document.getElementById('forcaCanvas');
const ctx = canvas.getContext('2d');
const musica = document.getElementById('musica');
musica.volume = 0.2;

palavraEl.innerText = letrasDescobertas.join(' ');

for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const btn = document.createElement('button');
    btn.innerText = letra;
    btn.onclick = () => tentarLetra(letra.toLowerCase(), btn);
    botoesEl.appendChild(btn);
}

function tentarLetra(letra, btn) {
    btn.disabled = true;
    if (palavra.includes(letra)) {
        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] === letra) {
                letrasDescobertas[i] = letra;
            }
        }
        palavraEl.style.color = '#00aa00';
        setTimeout(() => { palavraEl.style.color = '#006400'; }, 200);
    } else {
        letrasErradas.push(letra);
        tentativas--;
        letrasErradasEl.style.color = '#ff6600';
        setTimeout(() => { letrasErradasEl.style.color = '#ffcc00'; }, 200);
    }
    palavraEl.innerText = letrasDescobertas.join(' ');
    letrasErradasEl.innerText = 'Letras erradas: ' + letrasErradas.join(' ');
    desenharForca();

    if (!letrasDescobertas.includes('_')) {
        setTimeout(() => alert('🎉 Parabéns! Você acertou a palavra!'), 100);
    } else if (tentativas === 0) {
        setTimeout(() => alert('💀 Você perdeu! A palavra era: ' + palavra), 100);
    }
}

function desenharForca() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(10, 290); ctx.lineTo(290, 290); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 290); ctx.lineTo(50, 50); ctx.lineTo(150, 50); ctx.lineTo(150, 80); ctx.stroke();
    if (tentativas <= 5) { ctx.beginPath(); ctx.arc(150, 100, 20, 0, Math.PI * 2); ctx.stroke(); }
    if (tentativas <= 4) { ctx.beginPath(); ctx.moveTo(150, 120); ctx.lineTo(150, 200); ctx.stroke(); }
    if (tentativas <= 3) { ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(120, 170); ctx.stroke(); }
    if (tentativas <= 2) { ctx.beginPath(); ctx.moveTo(150, 140); ctx.lineTo(180, 170); ctx.stroke(); }
    if (tentativas <= 1) { ctx.beginPath(); ctx.moveTo(150, 200); ctx.lineTo(120, 250); ctx.stroke(); }
    if (tentativas <= 0) { ctx.beginPath(); ctx.moveTo(150, 200); ctx.lineTo(180, 250); ctx.stroke(); }
}

function reiniciar() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    letrasDescobertas = Array(palavra.length).fill('_');
    letrasErradas = [];
    tentativas = 6;
    palavraEl.innerText = letrasDescobertas.join(' ');
    letrasErradasEl.innerText = '';
    for (let btn of botoesEl.children) { btn.disabled = false; }
    desenharForca();
}

desenharForca();