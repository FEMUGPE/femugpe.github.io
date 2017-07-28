(() => {

  let app = {

  };

  //Message update cache
  app.oncontrollerchange = function () {
    console.log('Refresh  to see the newest content.');
  };

  //Registrando ServiceWorker
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./sw.js')
    .then((registration) => {
      console.log('ServiceWorker registrado!')
      if(typeof registration.update == 'function') {
        registration.update();
      }
    });
    navigator.serviceWorker.oncontrollerchange = app.oncontrollerchange;
  }
})();