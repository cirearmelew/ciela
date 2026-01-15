// Utility function to debounce resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to update all snowflakes' positions on resize/zoom
function updateAllSnow() {
  const snowflakes = document.querySelectorAll('.snowflake');
  const currentWidth = window.innerWidth;
  snowflakes.forEach(snow => {
    const frac = parseFloat(snow.dataset.leftFraction);
    if (frac !== undefined) {
      snow.style.left = (frac * currentWidth) + 'px';
    }
  });
}

// Debounced resize handler (handles both window resize and zoom changes, as zoom affects innerWidth)
const handleResize = debounce(updateAllSnow, 150); // 150ms debounce for smoothness

// Add resize listener
window.addEventListener('resize', handleResize);

// Also listen for wheel zoom (Ctrl + scroll) to trigger update immediately if needed
window.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    // Trigger update on zoom
    handleResize();
  }
}, { passive: true });

function createSnowLayer(layer) {
  const snow = document.createElement("div");
  snow.className = `snowflake layer-${layer}`;

  // Generate random fraction (0-1) for left position - this is key for resize/zoom invariance
  const leftFraction = Math.random();
  snow.dataset.leftFraction = leftFraction.toString(); // Store fraction for later updates
  snow.style.left = (leftFraction * window.innerWidth) + "px";

  // Layer depth duration (chậm hơn rất nhiều)
  const durations = {
    1: 6 + Math.random() * 5,   // foreground (slow)
    3: 18 + Math.random() * 10, // background (deep slow)
  };

  snow.style.animationDuration = durations[layer] + "s";

  // Layer depth size (nhỏ hơn)
  const sizes = {
    1: Math.random() * 2 + 1,   // 1-3px
    3: Math.random() * 1 + 0.5, // 0.5-1.5px
  };

  const size = sizes[layer];
  snow.style.width = size + "px";
  snow.style.height = size + "px";

  document.body.appendChild(snow);

  // Remove after animation + buffer
  setTimeout(() => {
    if (snow.parentNode) {
      snow.remove();
    }
  }, durations[layer] * 1000 + 2000);
}

// Spawn speed: To make it "full page" always, you can increase frequency or add more layers.
// Current: 2 layers, slower spawn for less density. Adjust intervals lower for more snow (e.g., 200ms for denser).
// For full coverage, consider calculating spawn rate based on window height, but this is fine for continuous effect.
setInterval(() => createSnowLayer(1), 400);
setInterval(() => createSnowLayer(3), 600);

// Optional: Initial spawn burst for immediate full coverage on load
// Uncomment if you want more snow right away:
// for (let i = 0; i < 20; i++) {
//   setTimeout(() => createSnowLayer(1), i * 50);
//   setTimeout(() => createSnowLayer(3), i * 80);
// }

// Cleanup listener on page unload (good practice)
window.addEventListener('beforeunload', () => {
  window.removeEventListener('resize', handleResize);
});