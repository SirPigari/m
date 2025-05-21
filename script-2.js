// Audio player control
const audio = document.getElementById("loveSong");

audio.volume = 0.5; // Set to 50% volume when unmuted

// Set initial position to 23 seconds once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  if (audio.duration > 20) {
    audio.currentTime = 20;
  }
});

// Auto-unmute when user clicks play
audio.addEventListener("play", () => {
  if (audio.muted) {
    audio.muted = false;
  }
});

// Daily love notes
const loveNotes = [
    "🦀🦐",
    "iluvuuuuu babyyy :33",
    "9.5.2025 <3",
    "Ur clothes make me shy... would you take them off for me??",
    "Meow, mwahhh <3",
    "Hewooo, how r u??",
    "^^",
    "M + L <3",
    "*pats head*",
    "beb :33",
    "ilysmmmm <333",
    "Can i get a discount? I want those pants 100% off",
    "can i get a hug?? 👉👈🥺",
    "meow",
    "mwaahh :3",
    "ur so cute!!",
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

const reasons = [
    "I love your personality",
    "You make me happy",
    "You make me finnaly feel loved",
    "You make me feel safe",
    "You make me laugh",
    "You make me feel special",
    "You trust me",
    "I can trust you",
    "I love your smile",
    "I love your laugh",
    "I love your super fucking cute voice",
    "I love you because u are super cute",
    "I love you because u are super funny",
    "I love you because u are smart",
    "I love you because u are awesome",
    "You can mae me smile anytime",
    "I would die with you",
    "I feel safe with you",
    "I trust you with every cell in my body",
    "I love you because you understand me",
    "I love you because we are on the same freaquency",
    "I wanna type with you every day",
    "I love your accent",
    "I love your humour",
    "I love your attitude",
    "pretty",
    "beautiful",
    "cute",
    "You are my world",
    "Youre awesome",
    "Im finnaly happy with you",
    "You make me happy even when im sad",
    "I love when you send me reels",
    "I love when you tell me you love me",
    "I love when you call me 'babe' or 'baby'",
    "u like cats",
    "i love your taste in music",
    "i love your big heart",
];

const ol = document.querySelector('ol.reason-list'); // make sure your ol has this class

reasons.forEach(reason => {
  const li = document.createElement('li');
  li.classList.add('reason-item');

  const p = document.createElement('p');
  p.classList.add('text-gray-600', 'dark:text-gray-300');
  p.textContent = reason;

  li.appendChild(p);
  ol.appendChild(li);
});
