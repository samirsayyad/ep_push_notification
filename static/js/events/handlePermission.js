import subscribeUserToTopic from '../firebase/subscribeUserToTopic';

export const checkPermissionAndHandleTopic = () => {
  console.log('checkPermissionAndHandleTopic');
  if (clientVars.ep_push_notification.subscribeTokenToTopic) return;
  if (clientVars.ep_profile_modal) { if (!clientVars.ep_profile_modal.push) return; }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    subscribeUserToTopic(
        clientVars.ep_push_notification.publicVapidKey,
        clientVars.ep_push_notification.firebaseConfig,
        pad.getPadId(),
        pad.getUserId()
    );
    // eslint-disable-next-line brace-style
  }
  // Otherwise, we need to ask the user for permission
  else {
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        subscribeUserToTopic(
            clientVars.ep_push_notification.publicVapidKey,
            clientVars.ep_push_notification.firebaseConfig,
            pad.getPadId(),
            pad.getUserId()
        );
      }
    });
  }
};
