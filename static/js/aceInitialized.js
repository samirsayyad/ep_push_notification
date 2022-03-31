'use strict';
const urlBase64ToUint8Array = async (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
const run = async () => {
  console.log('Registering service worker', navigator.serviceWorker);
  const registration = await navigator.serviceWorker
      .register('../static/plugins/ep_push_notification/static/js/worker.js');
  console.log('Registered service worker');

  // try{
  //     await (await registration.pushManager.getSubscription()).unsubscribe
  // }catch(e){
  //     console.log("e",e)
  // }

  navigator.serviceWorker.ready
      .then((registration) => registration.sync.register('sync-save-document'));


  const applicationServerKey =
  await urlBase64ToUint8Array(clientVars.ep_push_notification.publicVapidKey);
  console.log('Registering push');
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
  // registration.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: applicationServerKey
  // }).then((d)=>{
  //     console.log("d",d)
  // })
  // .catch(e=>{
  //     console.log("e",e)
  // })
  // console.log('Registering push',await registration.pushManager.subscribe() );
  // const subscription = await registration.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: await urlBase64ToUint8Array(publicVapidKey)
  // });
  // console.log(subscription,"sub");


  // const subscription = await registration.pushManager.
  //   subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  //   });
  console.log('Registered push');

  console.log('Sending push');
  await fetch(`/static/${
    pad.getPadId()}/pluginfw/ep_push_notification/subscribe/${pad.getUserId()}`, {
    method: 'POST',
    // body: {
    //   data: subscription,
    // },
    headers: {
      'content-type': 'application/json',
      'subscription': JSON.stringify(subscription),
    },
  });
  // const message = {
  //   type: 'ep_push_notification',
  //   action: 'sendPushNotification',
  //   userId: pad.getUserId(),
  //   padId: pad.getPadId(),
  //   data: subscription,
  // };
  // pad.collabClient.sendMessage(message);
  console.log('Sent push');
};

exports.aceInitialized = () => {
  // if ('Notification' in window) {
  //   if (window.Notification.permission === 'granted') {
  //     new window.Notification('Time is over!');
  //   }
  // }

  if ('serviceWorker' in navigator) {
    console.log('Registering service worker');
    run();
  } else {
    $.gritter.add({
      title: 'Error',
      text: 'Your browser does not support service worker.',
      // eslint-disable-next-line camelcase
      class_name: 'error',
    });
  }
};
