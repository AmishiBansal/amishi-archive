import {
  secretFile
} from "../core/dom.js";

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
/* SECRET FILE */
/* ========================= */

if (
  localStorage.getItem("secretFound")
) {

  secretFile.classList.add("found");

}

if (secretFile) {

  secretFile.addEventListener("click", () => {

    addXP(100);

    unlockAchievement(
      "Secret Finder"
    );

    localStorage.setItem(
      "secretFound",
      "true"
    );

    openModal(
      "CLASSIFIED FILE",

      `
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
      `
    );

  });

}