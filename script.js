let notes = [
  { title: "Babee??", message: "You are prettier than moon btw :3" },
  { title: "Who is a good girl??", message: "Yes its you! *pats head*" },
  { title: "beb", message: ":33" },
  { title: "iluvuuuuuu", message: "M <3" },
  { title: "Ur clothes make me shy...", message: "... would you take them off for me??" },
  { title: "Meow", message: "Mwahhh <3" },
  { title: "🦀🦐", message: "" },
  { title: "ilysmmmm", message: "<333" },
  { title: "Hewooo", message: "how r u??" },
  { title: "9.5.2025", message: "M + L <3" },
  { title: "480km", message: "7 days" },
  { title: "^^", message: "" },
  { title: "Last note", message: "but ill love you forever..." },
];

// Always display 6 random + 1 final note
const lastNote = notes[notes.length - 1];
const shuffled = notes.slice(0, -1).sort(() => Math.random() - 0.5).slice(0, 6);
notes = [...shuffled, lastNote];



const getRandomShade = () => {
  const baseHue = 50 + Math.floor(Math.random() * 10);
  const baseSaturation = 90 + Math.floor(Math.random() * 5);
  const baseLightness = 80 + Math.floor(Math.random() * 5);
  return `hsl(${baseHue}, ${baseSaturation}%, ${baseLightness}%)`;
};

const stack = document.getElementById('noteStack');

function createNote(data, zIndex) {
  const note = document.createElement('div');
  note.className = 'note';
  note.style.zIndex = zIndex;

  // Base background color
  note.style.backgroundColor = '#f9f1d3';  // Warm light beige


  // Repeating horizontal lines
  const baseLines = `
    repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.06) 0px,
      rgba(0, 0, 0, 0.06) 1px,
      transparent 25px
    )
  `;

  // Random stains
  const stains = Array.from({ length: 3 }).map(() => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const size = 10 + Math.floor(Math.random() * 40);
    const alpha = (Math.random() * 0.01 + 0.03).toFixed(2);
    const color = `rgba(139,69,19,${alpha})`;
    return `radial-gradient(circle at ${x}% ${y}%, ${color}, transparent ${size}%)`;
  });

  // Combine all background layers
  note.style.backgroundImage = [baseLines, ...stains].join(',');

  const title = document.createElement('h2');
  title.textContent = data.title;

  const text = document.createElement('p');
  text.textContent = data.message;

  note.appendChild(title);
  note.appendChild(text);

  note.addEventListener('click', () => {
    note.classList.add('falling');
    setTimeout(() => {
      note.remove();
    }, 800);
  });

  return note;
}

// Stack notes in reverse order
for (let i = notes.length - 1; i >= 0; i--) {
  const note = createNote(notes[i], notes.length - i);
  stack.appendChild(note);
}

let startY = 0;
let isPulling = false;
let triggered = false;

const pullRefresh = document.getElementById('pullRefresh');
const spinner = pullRefresh.querySelector('.spinner');
const container = document.querySelector('.container'); // ONLY move this

window.addEventListener('touchstart', (e) => {
  if (window.scrollY === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
    triggered = false;
    container.style.transition = ''; // reset animation
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

    // ⬇️ Update ONLY .container transform (adjust Y)
    container.style.transform = `translate(-50%, calc(-50% + ${clamped}px))`;

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

  // Animate back to center
  container.style.transition = 'transform 0.3s ease';
  container.style.transform = 'translate(-50%, -50%)';
});


