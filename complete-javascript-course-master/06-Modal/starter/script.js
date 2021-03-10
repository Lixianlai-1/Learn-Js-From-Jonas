'use strict';
const showModals = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const closeModalfn = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openModalfn = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < showModals.length; i++) {
  showModals[i].addEventListener('click', openModalfn);
}

closeModal.addEventListener('click', closeModalfn);
overlay.addEventListener('click', closeModalfn);

document.addEventListener('keydown', function (event) {
  console.log(event);
  if (event.code == 'Escape' && !modal.classList.contains('hidden')) {
    closeModalfn();
  }
});
