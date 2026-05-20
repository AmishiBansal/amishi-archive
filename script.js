/* All variable declarations */
const folderCards = document.querySelectorAll(".folder-card");
const contactBtn = document.querySelector(".contact-btn");
const contactModal = document.querySelector(".contact-modal");
const closeContact = document.querySelector(".close-contact");
const archiveModal = document.querySelector(".archive-modal");
const closeModal = document.querySelector(".close-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const folderSound = new Audio("assets/sounds/folder-open.mp3");
const achievementSound = new Audio("assets/sounds/achievement.mp3");
const terminalSound = new Audio("assets/sounds/terminal-open.mp3");
const hoverSound = new Audio("assets/sounds/hover.mp3");
const notes = document.querySelectorAll(".sticky-note");
const achievementPopup = document.querySelector(".achievement-popup");
const achievementTitle = document.querySelector(".achievement-title");
const terminalBtn = document.querySelector(".terminal-btn");
const terminalOverlay = document.querySelector(".terminal-overlay");
const terminalWindow = document.querySelector(".terminal-window");
const terminalClose = document.querySelector(".terminal-close");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector(".terminal-output");
const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".app-page");

/* Hover sound for folders */
folderCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    hoverSound.volume = 0.15;
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

/* Open Folder */
folderCards.forEach((card) => {
  card.addEventListener("click", () => {

    /* Get Data */
    const title = card.dataset.title;
    const content = card.dataset.content;

    /* Inject Content */
    modalTitle.innerHTML = title;
    modalBody.innerHTML = content;

    /* Show Modal */
    addXP(25);
    unlockAchievement("Archive Explorer");
    folderSound.currentTime = 0;
    folderSound.play();
    archiveModal.classList.add("show");
  });
});

/* Close Modal */
closeModal.addEventListener("click", () => {
  archiveModal.classList.remove("show");
});

archiveModal.addEventListener("click", (event) => {
  if (event.target === archiveModal) {
    archiveModal.classList.remove("show");
  }
});

/* Draggable Notes */
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

/* XP Sytem and loading saved XP */
let xp = Number(localStorage.getItem("xp")) || 1250;
const xpCount = document.querySelector("#xp-count");

/* Initial XP Display */
xpCount.textContent = xp.toLocaleString();

/* Adding XP */
function addXP(amount) {
  xp += amount;
  xpCount.textContent = xp.toLocaleString();
  localStorage.setItem("xp", xp);
}

/* Saved Achievements */
let unlockedAchievements = JSON.parse(localStorage.getItem("achievements")) || [];

/* Showing Achievements */
function unlockAchievement(title) {
  if (unlockedAchievements.includes(title)) 
  {
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

/* Secret File */
const secretFile = document.querySelector(".secret-file");

/* Check Saved Secret */
if (localStorage.getItem("secretFound"))
  {
    secretFile.classList.add("found");
  }

if(secretFile){
  secretFile.addEventListener("click", () => {
    addXP(100);
    unlockAchievement("Secret Finder");
    localStorage.setItem(
      "secretFound",
      "true"
)
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
  archiveModal.classList.add("show");
});
}

/* Open Modal*/
contactBtn.addEventListener("click", () => {
  contactModal.classList.add("show");
});

/* Close Modal */
closeContact.addEventListener("click", () => {
  contactModal.classList.remove("show");
});

/* Outside Click */
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove("show");
  }
});

/* Open Terminal */
function openTerminal() {
  terminalOverlay.classList.add("show");
  terminalWindow.classList.add("show");
  terminalInput.focus();
}

/* Close Terminal */
function closeTerminal() {
  terminalOverlay.classList.remove("show");
  terminalWindow.classList.remove("show");
}

/* Open Terminal on clicking the button with sounc*/
terminalBtn.addEventListener("click", () => {
  terminalSound.currentTime = 0;
  terminalSound.play();
  openTerminal();
});

terminalClose.addEventListener("click", () => {
  closeTerminal();
});

/* Escape Key Close for Terminal */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeTerminal();
  }
});

/* Click Outside to close terminal */
terminalOverlay.addEventListener("click", (e) => {
  if (e.target === terminalOverlay) {
    closeTerminal();
  }
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.page;
    pages.forEach(page => {
      page.classList.remove("active-page");
    });

    tabs.forEach(t => {
      t.classList.remove("active-tab");
    });

    document
      .getElementById(target)
      .classList.add("active-page");
    tab.classList.add("active-tab");
  });
});

/* Fake Archive DBs */
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

/* Terminal Commands */
terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.toLowerCase();
    runCommand(command);
    terminalInput.value = "";
  }
});

function runCommand(command) {
  let response = "";
  switch (command) {
    case "reset":
      localStorage.clear();
      response = `
        archive reset complete.
        refresh required.`;
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
        shortcuts`;
      break;

    case "about":
      response = `
        designer + developer
        obsessed with building
        playful experiences.`;
      break;

    case "skills":
      response = `
        html
        css
        javascript
        express
        ui motion
        interaction design`;
      break;

    case "projects":
      response = `
        currently building:
        the archive portfolio system.`;
      break;

    case "coffee":
      response = `
        caffeine levels:
        dangerously high.`;
      break;

    case "secret":
      response = `
        achievement unlocked:
        terminal explorer.`;
        addXP(150);
        unlockAchievement("Terminal Explorer");
      break;

    case "clear":
      terminalOutput.innerHTML = "";
      break;

    case "shortcuts":
      response = `
        keyboard shortcuts:
        T → open terminal
        ESC → close windows
        S → secret interaction`;
      break;

    default:
      response = `
        command not found.
        type "help"`;
  }

  terminalOutput.innerHTML += `
    <p>> ${command}</p>
    <p>${response}</p>`;

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

/* Ambient Notifications */
const notification = document.querySelector(".system-notification");
const notifText = document.querySelector(".notif-text");

/* Notification Messages */
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

/* Show Notification using random generator*/
function showNotification() {
  const randomMessage = notifications[Math.floor(Math.random() * notifications.length)];
  notifText.textContent = randomMessage;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3500);
}

/* Setting random Interval */
setInterval(() => {showNotification();}, 12000);

/* Keyboard Shortcuts*/
document.addEventListener("keydown", (e) => {

  /* Ensuring that keyboard shortcuts are not triggered while typing */
  const activeElement = document.activeElement;
  if (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA"
  ) {
    return;
  }

  /* Open Terminal using letter T */
  if (e.key.toLowerCase() === "t") {
    terminalOverlay.classList.add("show");
    terminalWindow.classList.add("show");
    terminalInput.focus();
    terminalSound.currentTime = 0;
    terminalSound.play();
  }

  /* Secret Shortcut */
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
if (searchInput){
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
}
