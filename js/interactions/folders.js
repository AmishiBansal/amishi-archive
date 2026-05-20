import {
  folderCards
} from "../core/dom.js";

import {
  folderSound,
  hoverSound
} from "../systems/sound.js";

import {
  addXP
} from "../systems/xp-system.js";

import {
  unlockAchievement
} from "../systems/achievements.js";

import {
  openModal
} from "../ui/modal.js";

/* ========================= */
/* FOLDER INTERACTIONS */
/* ========================= */

folderCards.forEach((card) => {

  /* HOVER */

  card.addEventListener("mouseenter", () => {

    hoverSound.volume = 0.15;

    hoverSound.currentTime = 0;

    hoverSound.play();

  });

  /* OPEN */

  card.addEventListener("click", () => {

    const title =
      card.dataset.title;

    const content =
      card.dataset.content;

    openModal(title, content);

    addXP(25);

    unlockAchievement(
      "Archive Explorer"
    );

    folderSound.currentTime = 0;

    folderSound.play();

  });

});