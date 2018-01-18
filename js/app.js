(() => {

  if ('Notification' in window) {
    Notification.requestPermission();
  } else {
    Materialize.toast('Autorize a notificação para ficar atualizado.', 4000);
  }

  const app = {};

  //Submissão
  $('#form-pagamento').on('submit', sendPagamento);

  function sendPagamento () {
    Materialize.toast('Obrigado.', 4000);
    $('#form-pagamento')[0].reset();
    if ('Notification' in window) {
        const notificationConfig = {
          title: 'Palestra Submetida com sucesso!',
          options: {
            icon: '/images/touch/icon.png',
            body: 'Você receberá a confirmação por e-mail.'
          }
        };

        if ('showNotification' in ServiceWorkerRegistration.prototype) {
          console.log('Notification SW');
          navigator.serviceWorker
          .ready
            .then((registration) => {
              registration.showNotification(notificationConfig.title, notificationConfig.options);
            });
        } else {
          console.log('Notification');
          new Notification(notificationConfig.title, notificationConfig.options);
        }
    }
      return false;
  };

  //Message update cache
  app.oncontrollerchange = () => {
    Materialize.toast('Atualize a aplicação para vê o conteúdo novo.', 3000, 'rounded');
    console.log('Atualize para vê o conteúdo novo2.');
  };

  //Registrando ServiceWorker caso o browser tenha suporte
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
    
    .register('./sw.js')
    .then((registration) => {
      if (typeof registration.update === 'function') {
        registration.update();
      }
    }).catch((err) => {
      console.error('Error during service worker registration:', err);
    });

    navigator.serviceWorker.oncontrollerchange = app.oncontrollerchange;
  }
  const appCache = window.applicationCache;
  appCache.update(); // Attempt to update the user's cache.

  if (appCache.status == window.applicationCache.UPDATEREADY) {
    appCache.swapCache();  // The fetch was successful, swap in the new cache.
    console.log(appCache.status)
  }

})();