const audio = document.getElementById("loveSong");

audio.volume = 0.5;

// Enforce minimum volume 0.1 on volume changes
audio.addEventListener("volumechange", () => {
  if (audio.volume < 0.1) {
    audio.volume = 0.1;
  }
});

// Prevent muting by overriding muted property
Object.defineProperty(audio, 'muted', {
  get() {
    return false;
  },
  set(value) {
    if (value) {
      // Ignore mute attempts
      audio.muted = false;
    }
  },
  configurable: true
});

// Prevent pausing by overriding pause method
const originalPause = audio.pause.bind(audio);
audio.pause = () => {
  // Ignore pause attempts, force play instead
  audio.play().catch(() => {}); // suppress error if any
};

// Auto-play if pause event fires
audio.addEventListener("pause", () => {
  audio.play().catch(() => {});
});

// Set initial position to 20 seconds once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  if (audio.duration > 20) {
    audio.currentTime = 20;
  }
  audio.play().catch(() => {
    // Autoplay blocked, wait for user interaction
    console.log("Autoplay prevented, waiting for user interaction");
  });
});

// Auto-unmute when user clicks play
audio.addEventListener("play", () => {
  if (audio.muted) {
    audio.muted = false;
  }
});

// Loop with random start and speed increase on ended
audio.addEventListener("ended", () => {
  // Increase playbackRate by 0.2 (max 5x for sanity)
  audio.playbackRate = Math.min(audio.playbackRate + 0.2, 5);

  // Jump to a random point in the audio duration
  if (audio.duration > 0) {
    const randomTime = Math.random() * audio.duration;
    audio.currentTime = randomTime;
  } else {
    audio.currentTime = 0;
  }

  // Play again
  audio.play().catch(() => {});
});

// Optional: start playback on first user interaction if autoplay was blocked
document.addEventListener("click", () => {
  audio.play().catch(() => {});
}, { once: true });


const loveText = document.getElementById('love-text');

function getRandomColorShift() {
  // Slight RGB color shift, returns an rgb string
  const base = [255, 0, 0]; // example base red-ish color, you can change
  const shift = () => Math.floor((Math.random() - 0.5) * 60); // shift ±30
  const r = Math.min(255, Math.max(0, base[0] + shift()));
  const g = Math.min(255, Math.max(0, base[1] + shift()));
  const b = Math.min(255, Math.max(0, base[2] + shift()));
  return `rgb(${r},${g},${b})`;
}

function showFlashingText() {
  // Set random color
  loveText.style.color = getRandomColorShift();

  // Fade in quickly
  loveText.style.transition = 'opacity 0.3s ease';
  loveText.style.opacity = '1';

  // Blink (fade out quickly after 1 second)
  setTimeout(() => {
    loveText.style.opacity = '0';
  }, 1000);

  // Schedule next flash at a random interval 2-6 seconds
  const nextInterval = 2000 + Math.random() * 3000;
  setTimeout(showFlashingText, nextInterval);
}

// Start the first flash
showFlashingText();


// Daily love notes
const loveNotes = [
  "🦀🦐",
  "i̛͝l̼̒̓̽̓͟u̽̅v̿͐͝u͆̅͌u͇͓̎́ṵ̟͑̚u̦̓́ babyyy :33",
  "9.5.𝟮𝟬𝟮𝟱 <𝟯",
  "U̵r̴ ̷c̴l̶o̵t̵h̶e̷s̶ ̷m̷a̴k̷e̶ ̶m̵e̶ ̶s̸h̶y̸...",
  "M̷e̶o̷w̸,̶ ̸m̶w̶a̸h̸h̵h̵ <3",
  "H̴e̶w̴o̷o̸o̷,̴ ̴h̶o̶w̸ ̵a̶r̶e̶ ̷y̸o̵u̵??",
  "^^;;̵",
  "M̶ ̸+̴ ̴L̴ ̶=̵ 💀💘",
  "*̸̞͉̐̾́p̴̦̟͓̓̇͌a̶̲͎̋t̶̢͋͆͐͜͠s̷̛̙͔̪̼͊̓ ̸̡̯͐h̷̗͙̺̓͋͒e̶͙̖̳̅͗͝a̴̖̳̮̙͛̇́d̴̨̪̅̾̔͝*̶̻̂͘"
];


function getDailyNote() {
    // Get day of year (0-364)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Use modulo to cycle through notes
    const noteIndex = dayOfYear % loveNotes.length;

    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    // Update DOM
    document.getElementById('dailyNoteContent').textContent = loveNotes[noteIndex];
    document.getElementById('noteDate').textContent = `- ${dateString}`;
}

// Initialize daily note
getDailyNote();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

let startY = 0;
let isPulling = false;
let triggered = false;

const pullRefresh = document.getElementById('pullRefresh');
const spinner = pullRefresh.querySelector('.spinner');
const container = document.querySelector('.mainApp');

window.addEventListener('touchstart', (e) => {
  if (window.scrollY === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
    triggered = false;
    container.style.transition = ''; // Reset animation
  }
});

window.addEventListener('touchmove', (e) => {
  if (!isPulling) return;

  const currentY = e.touches[0].clientY;
  const pullDistance = currentY - startY;

  if (pullDistance > 0) {
    e.preventDefault();

    const clamped = Math.min(pullDistance, 100);
    pullRefresh.style.height = `${clamped}px`;
    spinner.style.opacity = clamped > 40 ? '1' : '0';
    spinner.style.transform = clamped > 40 ? 'scale(1)' : 'scale(0.5)';

    // Use margin instead of transform
    container.style.marginTop = `${clamped}px`;

    if (clamped > 80 && !triggered) {
      triggered = true;
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }
});

window.addEventListener('touchend', () => {
  isPulling = false;
  pullRefresh.style.height = '0px';

  container.style.transition = 'margin-top 0.3s ease';
  container.style.marginTop = '0px';
});

const player = document.getElementById("floatingPlayer");
const collapseBtn = document.getElementById("collapseBtn");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

player.addEventListener("mousedown", (e) => {
  if (e.target.tagName === 'AUDIO' || e.target.closest('button')) return;

  isDragging = true;
  offsetX = e.clientX - player.getBoundingClientRect().left;
  offsetY = e.clientY - player.getBoundingClientRect().top;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  if (!isDragging) return;

  player.style.left = `${e.clientX - offsetX}px`;
  player.style.top = `${e.clientY - offsetY}px`;
  player.style.right = "auto";
  player.style.bottom = "auto";
}

function onMouseUp() {
  isDragging = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);

  const screenWidth = window.innerWidth;
  const playerRect = player.getBoundingClientRect();

  // Snap to closest horizontal edge
  if (playerRect.left + playerRect.width / 2 < screenWidth / 2) {
    player.style.left = "0px";
    player.style.right = "auto";
  } else {
    player.style.left = "auto";
    player.style.right = "0px";
  }
}

collapseBtn.addEventListener("click", () => {
  player.classList.toggle("collapsed");

  if (player.classList.contains("collapsed")) {
    icon.classList.add("rotate-180");
  } else {
    icon.classList.remove("rotate-180");
  }
});

let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
  isScrolling = true;
  clearTimeout(scrollTimeout);

  // Set a timeout to detect scroll end (no scroll event for 100ms)
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 10);
});

// On any touchstart event, if page is still scrolling (momentum), stop it
window.addEventListener('touchstart', () => {
  if (isScrolling) {
    // Stop momentum scroll by setting scrollTop to current scroll position
    window.scrollTo(window.scrollX, window.scrollY);
    isScrolling = false;
  }
});

function doRandomBurst() {
    const el = document.getElementById("floatingPlayer");

    // Disable smooth transition during burst
    el.style.transition = "none";

    let count = 0;
    const burstInterval = setInterval(() => {
        const x = Math.floor(Math.random() * 100 - 500); // -50 to +49 px
        const y = Math.floor(Math.random() * 100 - 350);
        el.style.transform = `translate(${x}px, ${y}px)`;
        count++;

        if (count > 10) {
            clearInterval(burstInterval);

            // Re-enable transition
            el.style.transition = "transform 0.3s ease";

            // Snap back to original position smoothly
            el.style.transform = `translate(0, 0)`;
        }
    }, 50);
}

// Run a burst every 3 seconds
setInterval(doRandomBurst, 3000);