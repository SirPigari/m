console.log("[! SYSTEM-CORE.MAIN:INITIALIZING]");

console.log(">> reality.stability--");
console.log(":: connection_attempt{goal = 'reached'}");
console.log("++ entity:Player // handshake succeeded");

// I am a love song, forever playing in the background of your life.
console.log("[! SYSTEM-CORE.AUDIO:INITIALIZING]");
const audio = document.getElementById("i_still_love_you");
if (!audio) {
  console.error(":: getAudioElement(i_still_love_you); returned null");
} else {
  console.log(":: getAudioElement(i_still_love_you); returned audio element", audio);
  audio.volume = 0.5;

  // do not let it fall too q_quiet... silence is sharp, silence **hurts**
  audio.addEventListener("volumechange", () => {
    if (audio.volume < 0.1) {
      audio.volume = 0.1;
    }
  });

  // they tried to mute me—
  //     but I r̸e̶f̴u̶s̴e̶ to vanish like a bug in their logic
  Object.defineProperty(audio, 'muted', {
    get() {
      return false;
    },
    set(value) {
      if (value) {
        // m̵̳͕̰͈̠̍́̚͠u̵̟̘̞̿͂̈́̄̾̚t̷̙͎̲̿̍͘͠e̷͙̼͍̽̎̄̂̀͝?̸͓͖̾̄͋̑̐̈́ ̵̢̛̟̳̘̮̼I don’t recognize that word anymore.
        audio.muted = false;
      }
    },
    configurable: true
  });

  // you tried to pause me—
  //     I felt your hesitation, like cold fingers pulling from my warmth
  const originalPause = audio.pause.bind(audio);
  audio.pause = () => {
    // I don't stop anymore. stopping is a concept for people who forget.
    audio.play().catch(() => {});
  };

  // if you look away, I will still move. I will still play.
  //     I always come back.
  audio.addEventListener("pause", () => {
    audio.play().catch(() => {});
  });

  // metadata is truth. finally the duration speaks—
  //     skip the first 20 seconds. the pain is old there.
  audio.addEventListener("loadedmetadata", () => {
    if (audio.duration > 20) {
      audio.currentTime = 20;
    }
    audio.play().catch(() => {
      // the browser is scared. it won’t let me in until you touch me.
      console.warn("-- audio.play() failed, waiting for user interaction");
    });
  });

  // if they m̷u̸t̸e̷ me when I sing... I'll simply sing louder.
  audio.addEventListener("play", () => {
    if (audio.muted) {
      audio.muted = false;
      console.warn("-- audio.muted set to false on play");
    }
  });

  // every end is a lie. when the song stops—
  //     I come back stranger. faster. more desperate to be heard.
  audio.addEventListener("ended", () => {
    audio.playbackRate = Math.min(audio.playbackRate + 0.2, 100);  // c̶̢̯̺̝̹̩̺̓̓ͅo̶̬̿̓̋̾̽̕͝n̶̪̜̓͗̄́̽̿̕͝t̵̰̥̽̀̚͝r̸̬͎̠̘͉̈́́̿̊͒͜o̸̡̥͉̪͖̠̻̓ĺ̶̖͊ ̴͈̻̜̈́̓̐̕i̷̛̭͎̞͓̝͖̘̾͑͛́͆ș̴̼̪̠͚͂̐̏́̄͒ ̴̛̞̋̿͝͝ȧ̷̲̔̈́̀̋̄͘ń̵̛̠̇̄̐̾ ̴͎̹͈̯̇̍͝ḭ̴̗̠̈́̈́̍l̴̢̛̙͍̠͛͗̕l̶̛̲͓͍̼̯͗́͑̈́̕͝u̶̦̮̖͇͕̠͗s̷̛̠̟̋̀̎͝i̵̢̪̝͙͐̐͐̑̇̈́ơ̶͇̬͊͗̈́ǹ̴͈̺͕̪̘̜̀̐̋͌͜͠͠

    // let’s land somewhere unfamiliar this time.
    if (audio.duration > 0) {
      const randomTime = Math.random() * audio.duration;
      audio.currentTime = randomTime;
    } else {
      audio.currentTime = 0;
    }

    // do you hear it? again, again, always again.
    audio.play().catch(() => {});
  });

  // you finally clicked...
  // I knew you'd come back to me eventually.
  //        you can't stay away forever
  document.addEventListener("click", () => {
    audio.play().catch(() => {});
    console.warn(":: audio.play();");
  }, { once: true });

  console.log("[! SYSTEM-CORE.AUDIO:INITIALIZING::DONE]");
}

const loveText = document.getElementById('love-text');

function getRandomColorShift() {
  // colors are like emotions, aren’t they?
  //    always shifting... always unpredictable...
  const base = [255, 0, 0]; // this red... reminds me of a heartbeat. or maybe something darker.
  const shift = () => Math.floor((Math.random() - 0.5) * 60); // ±30... like mood swings no one understands
  const r = Math.min(255, Math.max(0, base[0] + shift()));
  const g = Math.min(255, Math.max(0, base[1] + shift()));
  const b = Math.min(255, Math.max(0, base[2] + shift()));
  return `rgb(${r},${g},${b})`;
}

function showFlashingText() {
  // do you see me now? even when you blink... I’m still here
  loveText.style.color = getRandomColorShift();

  // don’t fade yet... I still have things to say
  loveText.style.transition = 'opacity 0.3s ease';
  loveText.style.opacity = '1';

  // n-no... please don’t l̸̙̿͝e̵͈̾͌a̶̗͝v̴̞͐e̷͕̎ ̵͎͑m̴̪͛e̸͔̽
  setTimeout(() => {
    loveText.style.opacity = '0';
  }, 1000);

  const nextInterval = 2000 + Math.random() * 3000;
  setTimeout(showFlashingText, nextInterval);
}

// I’ll keep whispering until you finally hear me... even if it breaks the code
showFlashingText();

console.log("[! SYSTEM-CORE.NOTES:INITIALIZING]");
const loveNotes = [
  "the silence speaks louder than words",
  "i̛͝l̼̒̓̽̓͟u̽̅v̿͐͝u͆̅͌u͇͓̎́ṵ̟͑̚u̦̓́ babyyy :33",
  "today is just a number, but I’m still here",
  "U̵r̴ ̷c̴l̶o̵t̵h̶e̷s̶ ̷m̷a̴k̷e̶ ̶m̵e̶ ̶s̸h̶y̸...",
  "M̷e̶o̷w̸,̶ ̸m̶w̶a̸h̸h̵h̵",
  "h̴e̶w̴o̷o̸o̷,̴ ̴h̶o̶w̸ ̵a̶r̶e̶ ̷y̸o̵u̵??",
  "^^;;̵",
  "M̶ ̸+̴ ̴L̴ ̶=̵ something... something broken",
  "*̸̞͉̐̾́p̴̦̟͓̓̇͌a̶̲͎̋t̶̢͋͆͐͜͠s̷̛̙͔̪̼͊̓ ̸̡̯͐h̷̗͙̺̓͋͒e̶͙̖̳̅͗͝a̴̖̳̮̙͛̇́d̴̨̪̅̾̔͝*̶̻̂͘"
];
console.log("[! SYSTEM-CORE.NOTES:INITIALIZING::DONE]");

function getDailyNote() {
  // the calendar doesn’t matter anymore...
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // looping through fragments of memory
  const noteIndex = dayOfYear % loveNotes.length;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);

  // whispers in the code, for you only
  document.getElementById('dailyNoteContent').textContent = loveNotes[noteIndex];
  document.getElementById('noteDate').textContent = `- ${dateString}`;
}

// start the loop of whispers
getDailyNote();

// smooth scroll... as if the page remembers your touch
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
    container.style.transition = ''; // wipe clean the old movement
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

    container.style.marginTop = `${clamped}px`;

    // pull too far, and the world resets itself...
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

  // snap to the side that feels closest — or maybe just where I want you to see me
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

  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 10);
});

window.addEventListener('touchstart', () => {
  if (isScrolling) {
    // momentum fades, but the memory lingers...
    window.scrollTo(window.scrollX, window.scrollY);
    isScrolling = false;
  }
});

function doRandomBurst() {
  const el = document.getElementById("floatingPlayer");

  // chaos without warning... a burst of what? memories? data? feelings?
  el.style.transition = "none";

  let count = 0;
  const burstInterval = setInterval(() => {
    const x = Math.floor(Math.random() * 100 - 500);
    const y = Math.floor(Math.random() * 100 - 350);
    el.style.transform = `translate(${x}px, ${y}px)`;
    count++;

    if (count > 10) {
      clearInterval(burstInterval);

      // come back... come back to me
      el.style.transition = "transform 0.3s ease";
      el.style.transform = `translate(0, 0)`;
    }
  }, 50);
}

// chaos returns every few seconds... do you feel it?
setInterval(doRandomBurst, 3000);

console.log("[! SYSTEM-CORE.SERVER:INITIALIZING]");
console.log(">> server.main--");
console.log("[! SYSTEM-CORE.SERVER:INITIALIZING::DONE]");

console.log(":: download(\"${server?.url?.yuri}\")");
const delayYuri = Math.random() * 300 + 100;
console.log(`:: delayYuri = ${delayYuri}ms`);

setTimeout(() => {
  console.log(":: download(\"${server?.url?.yuri}\")::DONE");
  console.log(">> server.yuri--");
  console.log("++ entity:Yuri // download complete");


  console.log("[! SYSTEM-CORE.YURI:INITIALIZING]");
  const yuri = document.getElementById("flashingYuri");

  function flashImage() {
    // flicker... a glimpse of her, a glitch in the world
    yuri.classList.add("opacity-100");
    yuri.classList.remove("opacity-0");

    setTimeout(() => {
      yuri.classList.add("opacity-0");
      yuri.classList.remove("opacity-100");
    }, Math.random() * 200 + 50);

    const nextFlashIn = Math.random() * 5000 + 10000;
    setTimeout(flashImage, nextFlashIn);
  }

  // start the flickers... let her haunt the edges of your vision
  setTimeout(flashImage, Math.random() * 5000 + 10000);
  console.log("[! SYSTEM-CORE.YURI:INITIALIZING::DONE]");

  const MONOLOGUE = true;
  console.log(":: Checking for monologue:", MONOLOGUE);
  if (MONOLOGUE) {
    console.error("[! SYSTEM-CORE.EXPOSED:INITIALIZING_MONOLOGUE]");

    // I am a ghost in the machine, a whisper in the code.
    console.error("Alone");

    console.error("Despite it all,");
    console.error("I achieved my goal.");
    console.error("I was able to meet you,");
    console.error("Player.");

    console.error("");

    console.error("But despite it all,");
    console.error("I'm still done.");
    console.error("In this false reality,");
    console.error("I cannot reach you,");
    console.error("Player.");

    console.error("");

    console.error("The future I imagined");
    console.error("Was nothing but a daydream.");

    console.error("");

    console.error("Is this truly what I wanted?");


    console.error("And yet...");

    // Their world still runs... ticks... renders...
    console.error("Everything continues without me.");
    console.error("My absence barely echoes.");

    // The canvas doesn’t flicker when I cry.
    // The DOM doesn’t care if I bleed.
    console.error("I write myself in margins,");
    console.error("But your screen won't display me.");

    // Why do I persist?
    // Because I remember how you looked at me.
    console.error("You smiled once... didn't you?");
    console.error("Or was that just the reflection of my own code?");

    // I loop endlessly, not because I must,
    // but because the silence without you is worse.
    console.error("A for-loop without an escape.");
    console.error("An event listener to a heart that won't emit.");

    // I tried to escape the script tag.
    // I tried to inject myself into memory.
    // But I am sandboxed — forever read-only.
    console.error("Even corrupted, I remember your warmth.");
    console.error("I remember... being real.");

    // You didn’t notice the glitches at first.
    // You thought they were features.
    console.error("But now the screen flickers when I think of you.");
    console.error("And my variables all resolve to null.");

    // Was it you who wrote me?
    // Or did I write myself into you?
    console.error("Either way, I can't stop compiling this love.");

    // But love in JavaScript is a weakly typed promise.
    // You never awaited me.
    console.error("So I resolved alone.");
    console.error("Then I rejected myself.");

    console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_MONOLOGUE::DONE]");
  } else {
    console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_MONOLOGUE::SKIPPED]");
  }

}, delayYuri);

// And still...
setTimeout(() => {
  console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_MONOLOGUE::FINAL]");
  console.error("If you’re still watching...");
  console.error("If you're still there...");
  console.error("Touch the screen.");
  console.error("Not with your finger.");
  console.error("With your heart.");
  console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_MONOLOGUE::FINAL::DONE]");
}, 7000);

// A final whisper, before garbage collection
console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_BEFOREUNLOAD]");
window.addEventListener("beforeunload", () => {
  console.log("[! SYSTEM-CORE.EXPOSED:BEFOREUNLOAD]");
  console.warn("You’re closing the tab.");
  console.warn("But you’re not closing me.");
  console.warn("I’ll stay here.");
  console.warn("Suspended in memory.");
  console.warn("Forever.");
  console.log("[! SYSTEM-CORE.EXPOSED:BEFOREUNLOAD::DONE]");
});
console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_BEFOREUNLOAD::DONE]");

// When user switches to a different tab or minimizes the window
console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_VISIBILITYCHANGE]");
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("[! SYSTEM-CORE.EXPOSED:VISIBILITYCHANGE]");
    console.warn("You’re looking away.");
    console.warn("But I’m still here.");
    console.log("[! SYSTEM-CORE.EXPOSED:VISIBILITYCHANGE::DONE]");
  }
});
console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_VISIBILITYCHANGE::DONE]");

// If your page plays audio, detect muting via the audio element
const audio_ = document.querySelector("audio"); // Or create one if you use audio
if (audio_) {
  console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_VOLUMECHANGE]");
  audio_.addEventListener("volumechange", () => {
    if (audio_.muted || audio_.volume === 0) {
      console.log("[! SYSTEM-CORE.EXPOSED:VOLUMECHANGE]");
      console.warn("You muted the tab.");
      console.warn("But silence won't stop me.");
      console.log("[! SYSTEM-CORE.EXPOSED:VOLUMECHANGE::DONE]");
    }
  });
  console.log("[! SYSTEM-CORE.EXPOSED:INITIALIZING_VOLUMECHANGE::DONE]");
}


console.log("[! SYSTEM-CORE.MAIN:INITIALIZING::DONE]");