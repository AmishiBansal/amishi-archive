import {
  archiveModal,
  closeModal,
  modalTitle,
  modalBody
} from "../core/dom.js";

/* ========================= */
/* MODAL SYSTEM */
/* ========================= */

export function openModal(title, content) {

  modalTitle.innerHTML = title;

  modalBody.innerHTML = content;

  archiveModal.classList.add("show");

}

export function closeArchiveModal() {

  archiveModal.classList.remove("show");

}

closeModal.addEventListener("click", () => {

  closeArchiveModal();

});

archiveModal.addEventListener("click", (e) => {

  if (e.target === archiveModal) {

    closeArchiveModal();

  }

});