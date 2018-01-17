(() => {

  let app = {};

  //Pagamento
  $('#form-pagamento').on('submit', sendPagamento);

  function sendPagamento () {
    Materialize.toast('Obrigado.', 4000);
    $('#form-pagamento')[0].reset();
    if ('Notification' in window) {
        Notification.requestPermission();

        let notificationConfig = {
          title: 'Pagamento do boleto enviado!',
          options: {
            icon: '/images/touch/icon.png',
            body: 'Você receberá a confirmação por e-mail.'
          }
        };

        if ('showNotification' in ServiceWorkerRegistration.prototype) {
          console.log('Notification SW');
          navigator.serviceWorker
          .ready
            .then(function(registration){
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
  app.oncontrollerchange = function () {
    Materialize.toast('Atualize a aplicação para vê o conteúdo novo.', 3000, 'rounded');
    console.log('Atualize para vê o conteúdo novo2.');
  };

  //Registrando ServiceWorker caso o browser tenha suporte
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
    
    .register('./sw.js')
    .then(function(registration) {
      if (typeof registration.update == 'function') {
        registration.update();
      }
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });

    navigator.serviceWorker.oncontrollerchange = app.oncontrollerchange;
  }
})();