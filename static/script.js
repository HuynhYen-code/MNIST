const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

function clearCanvas() {
    ctx.fillStyle = 'black';  // nền đen giống MNIST
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
window.onload = clearCanvas;

let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => drawing = false);

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.strokeStyle = 'white';  // nét vẽ trắng
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

function predictDigit(){
    const dataURL = canvas.toDataURL();
    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataURL })
    })
    .then(res => res.json())
    .then(data => {
        const resultEl = document.getElementById('result');
        resultEl.textContent = `Cục vàng đã viết số ${data.prediction}`;
        
        // Thêm hiệu ứng flash
        resultEl.classList.add('flash');
        setTimeout(() => resultEl.classList.remove('flash'), 500);
        document.getElementById('Flex').style.opacity = '1';
    });
}