const folderCards = document.querySelectorAll(".folder-card");
/* ========================= */
/* HOVER SOUND */
/* ========================= */

folderCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    hoverSound.volume = 0.15;

    hoverSound.currentTime = 0;

    hoverSound.play();
  });
});
/* ========================= */
/* MOOD SYSTEM */
/* ========================= */

// const moods = [

//   {
//     name: "rainy day",

//     bg: "#0f1117",

//     panel: "#171a22",

//     card: "rgba(255,255,255,0.05)",

//     border: "rgba(255,255,255,0.08)",

//     text: "#f5f5f5"
//   },

//   {
//     name: "sunny day",

//     bg: "#f5efe6",

//     panel: "#fffaf2",

//     card: "rgba(0,0,0,0.04)",

//     border: "rgba(0,0,0,0.08)",

//     text: "#1a1a1a"
//   },

//   {
//     name: "midnight lab",

//     bg: "#050816",

//     panel: "#0b1020",

//     card: "rgba(76,110,245,0.08)",

//     border: "rgba(76,110,245,0.15)",

//     text: "#dbe4ff"
//   },

//   {
//     name: "golden hour",

//     bg: "#241b16",

//     panel: "#30241e",

//     card: "rgba(255,184,108,0.08)",

//     border: "rgba(255,184,108,0.18)",

//     text: "#fff3dd"
//   }

// ];

// const moodToggle =
//   document.querySelector(".mood-toggle");

// let currentMood =
//   Number(
//     localStorage.getItem("moodIndex")
//   ) || 0;

// function applyMood(index) {

//   const mood =
//     moods[index];

//   document.documentElement.style.setProperty(
//     "--bg-color",
//     mood.bg
//   );

//   document.documentElement.style.setProperty(
//     "--panel-color",
//     mood.panel
//   );

//   document.documentElement.style.setProperty(
//     "--card-color",
//     mood.card
//   );

//   document.documentElement.style.setProperty(
//     "--border-color",
//     mood.border
//   );

//   document.documentElement.style.setProperty(
//     "--text-color",
//     mood.text
//   );

//   moodToggle.textContent =
//     `☁ ${mood.name}`;

// }

// applyMood(currentMood);

// moodToggle.addEventListener("click", () => {

//   currentMood++;

//   if (currentMood >= moods.length) {

//     currentMood = 0;

//   }

//   applyMood(currentMood);

//   localStorage.setItem(
//     "moodIndex",
//     currentMood
//   );

// });

const archiveModal = document.querySelector(".archive-modal");

const closeModal = document.querySelector(".close-modal");

const modalTitle = document.querySelector("#modal-title");

const modalBody = document.querySelector("#modal-body");
/* ========================= */
/* SOUND EFFECTS */
/* ========================= */

const folderSound = new Audio("assets/sounds/folder-open.mp3");

const achievementSound = new Audio("assets/sounds/achievement.mp3");

const terminalSound = new Audio("assets/sounds/terminal-open.mp3");

const hoverSound = new Audio("assets/sounds/hover.mp3");

/* ========================= */
/* OPEN FOLDER */
/* ========================= */

folderCards.forEach((card) => {
  card.addEventListener("click", () => {
    /* GET DATA */

    const title = card.dataset.title;

    const content = card.dataset.content;

    /* INJECT CONTENT */

    modalTitle.innerHTML = title;

    modalBody.innerHTML = content;

    /* SHOW MODAL */
    addXP(25);

    unlockAchievement("Archive Explorer");
    folderSound.currentTime = 0;

    folderSound.play();

    archiveModal.classList.add("show");
  });
});

/* ========================= */
/* CLOSE MODAL */
/* ========================= */

closeModal.addEventListener("click", () => {
  archiveModal.classList.remove("show");
});

/* ========================= */
/* CLOSE OUTSIDE */
/* ========================= */

archiveModal.addEventListener("click", (event) => {
  if (event.target === archiveModal) {
    archiveModal.classList.remove("show");
  }
});
/* ========================= */
/* DRAGGABLE NOTES */
/* ========================= */

const notes = document.querySelectorAll(".sticky-note");

notes.forEach((note) => {
  let isDragging = false;

  let offsetX, offsetY;

  note.addEventListener("mousedown", (e) => {
    isDragging = true;

    offsetX = e.clientX - note.offsetLeft;

    offsetY = e.clientY - note.offsetTop;

    note.style.position = "absolute";

    note.style.zIndex = 9999;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    note.style.left = `${e.clientX - offsetX}px`;

    note.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});
/* ========================= */
/* XP SYSTEM */
/* ========================= */

/* ========================= */
/* LOAD SAVED XP */
/* ========================= */

let xp =
  Number(localStorage.getItem("xp"))
  || 1250;

const xpCount = document.querySelector("#xp-count");
/* INITIAL DISPLAY */

xpCount.textContent =
  xp.toLocaleString();

const achievementPopup = document.querySelector(".achievement-popup");

const achievementTitle = document.querySelector(".achievement-title");

/* ========================= */
/* ADD XP */
/* ========================= */
function addXP(amount) {

  xp += amount;

  xpCount.textContent =
    xp.toLocaleString();

  localStorage.setItem("xp", xp);

}
/* ========================= */
/* SAVED ACHIEVEMENTS */
/* ========================= */

let unlockedAchievements =
  JSON.parse(
    localStorage.getItem("achievements")
  ) || [];

/* ========================= */
/* SHOW ACHIEVEMENT */
/* ========================= */

function unlockAchievement(title) {

  if (
    unlockedAchievements.includes(title)
  ) {
    return;
  }

  achievementTitle.textContent = title;

  achievementSound.currentTime = 0;

  achievementSound.play();


  unlockedAchievements.push(title);

  localStorage.setItem(
    "achievements",
    JSON.stringify(unlockedAchievements)
  );

  achievementPopup.classList.add("show");

  setTimeout(() => {

    achievementPopup.classList.remove("show");

  }, 3000);

}
/* ========================= */
/* SECRET FILE */
/* ========================= */

const secretFile = document.querySelector(".secret-file");
/* ========================= */
/* CHECK SAVED SECRET */
/* ========================= */

if (
  localStorage.getItem("secretFound")
) {

  secretFile.classList.add("found");

}

secretFile.addEventListener("click", () => {
  /* XP */

  addXP(100);

  /* ACHIEVEMENT */

  unlockAchievement("Secret Finder");
  /* SAVE SECRET */

localStorage.setItem(
  "secretFound",
  "true"
);

  /* CHANGE MODAL CONTENT */

  modalTitle.innerHTML = "CLASSIFIED FILE";

  modalBody.innerHTML = `

    <div class="quest-card">

      <span class="quest-tag">
        hidden log
      </span>

      <h3>
        things nobody sees
      </h3>

      <p>
        the failed designs,
        broken layouts,
        debugging spirals,
        and all the tiny moments
        that made me better.
      </p>

    </div>


    <div class="quest-card">

      <span class="quest-tag">
        secret achievement
      </span>

      <h3>
        curiosity unlocked
      </h3>

      <p>
        you explored beyond
        the obvious.
      </p>

    </div>

  `;

  /* OPEN MODAL */

  archiveModal.classList.add("show");
});
/* ========================= */
/* CONTACT MODAL */
/* ========================= */

const contactBtn =
  document.querySelector(".contact-btn");

const contactModal =
  document.querySelector(".contact-modal");

const closeContact =
  document.querySelector(".close-contact");


/* OPEN */

contactBtn.addEventListener("click", () => {

  contactModal.classList.add("show");

});


/* CLOSE */

closeContact.addEventListener("click", () => {

  contactModal.classList.remove("show");

});


/* OUTSIDE CLICK */

contactModal.addEventListener("click", (e) => {

  if (e.target === contactModal) {

    contactModal.classList.remove("show");

  }

});
/* ========================= */
/* TERMINAL SYSTEM */
/* ========================= */

const terminalBtn = document.querySelector(".terminal-btn");
const terminalOverlay = document.querySelector(".terminal-overlay");
const terminalWindow = document.querySelector(".terminal-window");
const terminalClose = document.querySelector(".terminal-close");

const terminalInput = document.querySelector("#terminal-input");

const terminalOutput = document.querySelector(".terminal-output");

/* ========================= */
/* OPEN TERMINAL */
/* ========================= */
function openTerminal() {
  terminalOverlay.classList.add("show");

  terminalWindow.classList.add("show");

  terminalInput.focus();
}

function closeTerminal() {
  terminalOverlay.classList.remove("show");

  terminalWindow.classList.remove("show");
}
/* ========================= */
/* OPEN TERMINAL */
/* ========================= */

terminalBtn.addEventListener("click", () => {

  terminalSound.currentTime = 0;

  terminalSound.play();

  openTerminal();

});


/* ========================= */
/* CLOSE TERMINAL */
/* ========================= */

terminalClose.addEventListener("click", () => {

  closeTerminal();

});
/* ========================= */
/* ESCAPE KEY CLOSE */
/* ========================= */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    closeTerminal();

  }

});
/* ========================= */
/* CLICK OUTSIDE */
/* ========================= */

terminalOverlay.addEventListener("click", (e) => {
  if (e.target === terminalOverlay) {
    closeTerminal();
  }
});
/* ========================= */
/* FAKE ARCHIVE DATABASE */
/* ========================= */

const archiveDB = [

  {
    title: "JavaScript Era",

    type: "Skill Log",

    content:
      "learned DOM manipulation, events, and dynamic UI systems."
  },

  {
    title: "Portfolio System",

    type: "Project",

    content:
      "built an interactive archive-inspired portfolio experience."
  },

  {
    title: "Bug #042",

    type: "Debug Report",

    content:
      "spent 3 hours debugging a missing bracket."
  },

  {
    title: "Coffee Dependency",

    type: "Status Report",

    content:
      "critical caffeine levels required for survival."
  },

  {
    title: "Terminal Discovery",

    type: "Achievement",

    content:
      "unlocked hidden terminal functionality."
  }

];
/* ========================= */
/* COMMANDS */
/* ========================= */

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.toLowerCase();

    runCommand(command);

    terminalInput.value = "";
  }
});

/* ========================= */
/* RUN COMMAND */
/* ========================= */

function runCommand(command) {
  let response = "";

  switch (command) {
    case "reset":

  localStorage.clear();

  response = `
  archive reset complete.
  refresh required.
  `;

  break;
    case "help":
      response = `
      available commands:
      about
      skills
      projects
      coffee
      secret
      clear
      shortcuts
      `;

      break;

    case "about":
      response = `
      designer + developer
      obsessed with building
      playful experiences.
      `;

      break;

    case "skills":
      response = `
      html
      css
      javascript
      express
      ui motion
      interaction design
      `;

      break;

    case "projects":
      response = `
      currently building:
      the archive portfolio system.
      `;

      break;

    case "coffee":
      response = `
      caffeine levels:
      dangerously high.
      `;

      break;

    case "secret":
      response = `
      achievement unlocked:
      terminal explorer.
      `;

      addXP(150);

      unlockAchievement("Terminal Explorer");

      break;

    case "clear":
      terminalOutput.innerHTML = "";

    case "shortcuts":
      response = `

  keyboard shortcuts:

  T → open terminal
  ESC → close windows
  S → secret interaction

  `;

      break;

      return;

    default:
      response = `
      command not found.
      type "help"
      `;
  }

  terminalOutput.innerHTML += `

    <p>> ${command}</p>

    <p>${response}</p>

  `;

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
/* ========================= */
/* AMBIENT NOTIFICATIONS */
/* ========================= */

const notification = document.querySelector(".system-notification");

const notifText = document.querySelector(".notif-text");

/* NOTIFICATION MESSAGES */

const notifications = [
  "new idea archived",

  "creative energy restored",

  "bug defeated successfully",

  "interaction upgraded",

  "new inspiration discovered",

  "design level increased",

  "coffee.exe initialized",

  "javascript survived another day",

  "ui polish added",

  "dopamine levels stable",
];

/* SHOW NOTIFICATION */

function showNotification() {
  /* RANDOM MESSAGE */

  const randomMessage =
    notifications[Math.floor(Math.random() * notifications.length)];

  notifText.textContent = randomMessage;

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3500);
}

/* RANDOM INTERVAL */

setInterval(() => {
  showNotification();
}, 12000);
/* ========================= */
/* KEYBOARD SHORTCUTS */
/* ========================= */

document.addEventListener("keydown", (e) => {
  /* ========================= */
  /* DON'T TRIGGER WHILE TYPING */
  /* ========================= */

  const activeElement = document.activeElement;

  if (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA"
  ) {
    return;
  }

  /* ========================= */
  /* TERMINAL */
  /* ========================= */

  if (e.key.toLowerCase() === "t") {
    terminalOverlay.classList.add("show");

    terminalWindow.classList.add("show");

    terminalInput.focus();

    terminalSound.currentTime = 0;

    terminalSound.play();
  }

  /* ========================= */
  /* CLOSE EVERYTHING */
  /* ========================= */

  if (e.key === "Escape") {
    /* CLOSE TERMINAL */

    terminalOverlay.classList.remove("show");

    terminalWindow.classList.remove("show");

    /* CLOSE ARCHIVE MODAL */

    archiveModal.classList.remove("show");
  }

  /* ========================= */
  /* SECRET SHORTCUT */
  /* ========================= */

  if (e.key.toLowerCase() === "s") {
    addXP(50);

    unlockAchievement("Shortcut Hacker");

    showNotification();
  }
});
/* ========================= */
/* SEARCH SYSTEM */
/* ========================= */

const searchInput =
  document.querySelector(
    "#archive-search-input"
  );

const searchResults =
  document.querySelector(
    ".search-results"
  );


/* SEARCH INPUT */

searchInput.addEventListener("input", () => {

  const query =
    searchInput.value.toLowerCase();


  /* CLEAR RESULTS */

  searchResults.innerHTML = "";


  /* EMPTY QUERY */

  if (query === "") {

    return;

  }


  /* FILTER DATABASE */

  const filteredResults =
    archiveDB.filter((item) => {

      return (

        item.title
          .toLowerCase()
          .includes(query)

        ||

        item.content
          .toLowerCase()
          .includes(query)

        ||

        item.type
          .toLowerCase()
          .includes(query)

      );

    });


  /* NO RESULTS */

  if (filteredResults.length === 0) {

    searchResults.innerHTML = `

      <div class="search-card">

        <p>
          no archive files found.
        </p>

      </div>

    `;

    return;

  }


  /* RENDER RESULTS */

  filteredResults.forEach((item) => {

    searchResults.innerHTML += `

      <div class="search-card">

        <span class="search-type">
          ${item.type}
        </span>

        <h3>
          ${item.title}
        </h3>

        <p>
          ${item.content}
        </p>

      </div>

    `;

  });

});