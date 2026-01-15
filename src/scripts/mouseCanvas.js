let canvas, ctx;
let trailHistory = []; // Lịch sử vị trí chuột để vẽ trail mượt

function setupCanvas() {
  canvas = document.createElement("canvas");
  canvas.className = "mouse-canvas";
  document.body.appendChild(canvas);

  ctx = canvas.getContext("2d");
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", onMouseMove);

  animate();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;

  // Thêm vị trí mới vào trail history (giới hạn ngắn hơn cho clean)
  trailHistory.push({ x, y, alpha: 1 });
  if (trailHistory.length > 20) {
    trailHistory.shift(); // Xóa điểm cũ nhất
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ====================================================
  // ⭐ TRAIL LINE - mượt mà với history và glow nhẹ
  // ====================================================
  if (trailHistory.length > 1) {
    ctx.shadowBlur = 10; // Glow nhẹ hơn
    ctx.shadowColor = "rgba(255, 255, 255, 0.3)";

    // Vẽ trail từ cũ đến mới với alpha giảm dần
    for (let i = 0; i < trailHistory.length - 1; i++) {
      const current = trailHistory[i];
      const next = trailHistory[i + 1];
      const alpha = current.alpha * 0.2; // Fade nhanh hơn

      // Đơn giản hóa: chỉ trắng nhạt, không gradient phức tạp
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;

      ctx.beginPath();
      ctx.lineWidth = 2 + i * 0.05; // Mỏng hơn
      ctx.lineCap = "round";
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
    }

    // Giảm alpha cho tất cả points cũ (nhanh hơn)
    trailHistory.forEach(point => point.alpha *= 0.95);
    // Xóa points alpha <=0
    trailHistory = trailHistory.filter(point => point.alpha > 0.01);

    ctx.shadowBlur = 0; // Tắt glow sau trail
  }

  requestAnimationFrame(animate);
}

// Initialize
setupCanvas();