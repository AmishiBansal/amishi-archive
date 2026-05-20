import { xpCount } from "../core/dom.js";

/* ========================= */
/* XP SYSTEM */
/* ========================= */

let xp =
  Number(localStorage.getItem("xp"))
  || 1250;

xpCount.textContent =
  xp.toLocaleString();

export function addXP(amount) {

  xp += amount;

  xpCount.textContent =
    xp.toLocaleString();

  localStorage.setItem("xp", xp);

}