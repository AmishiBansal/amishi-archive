import {
  achievementPopup,
  achievementTitle
} from "../core/dom.js";

import {
  achievementSound
} from "./sound.js";

/* ========================= */
/* ACHIEVEMENTS */
/* ========================= */

let unlockedAchievements =
  JSON.parse(
    localStorage.getItem("achievements")
  ) || [];

export function unlockAchievement(title) {

  if (
    unlockedAchievements.includes(title)
  ) {
    return;
  }

  achievementTitle.textContent =
    title;

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