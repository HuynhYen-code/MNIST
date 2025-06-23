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

// Hàm lấy tọa độ từ sự kiện chuột hoặc cảm ứng trên canvas
function getPos(e) {
    if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    } else {
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }
}

// Sự kiện chuột
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
});

canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const pos = getPos(e);
    ctx.strokeStyle = 'white';  // nét vẽ trắng
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
});

// Sự kiện cảm ứng (touch)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();  // ngăn cuộn trang khi vẽ
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    drawing = false;
});

canvas.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    drawing = false;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!drawing) return;
    const pos = getPos(e);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
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
        resultEl.textContent = `Bạn đã viết số ${data.prediction}`;
        
        // Thêm hiệu ứng flash
        resultEl.classList.add('flash');
        setTimeout(() => resultEl.classList.remove('flash'), 500);
        document.getElementById('Flex').style.opacity = '1';
    });
}
