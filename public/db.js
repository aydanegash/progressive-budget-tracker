// if('servicewoker' in navigator){
//     navigator.serviceWorker.register('/service-worker.js')
//     .then((reg) => console.log('service worker registered', reg))
//     .catch((err) => console.log('service worker NOT registered', err))
// }

document.addEventListener('DOMContentLoaded', init, false);
function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('Service worker registered -->', reg);
      }, (err) => {
        console.error('Service worker not registered -->', err);
      });
  }
}

document.addEventListener('DOMContentLoaded', init, false);

function init() {
  if (!navigator.onLine) {
    const statusElem = document.querySelector('.page-status')
    statusElem.innerHTML = 'offline'
  }
}