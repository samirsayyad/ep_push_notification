import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, deleteToken} from 'firebase/messaging';

const getServiceWorkerInstance = async () => await navigator.serviceWorker.register(
    '../static/plugins/ep_push_notification/static/js/firebase-messaging-sw.js'
);

const getRegisterationToken = async (publicVapidKey, firebaseConfig) => {
  try {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    messaging.swRegistration = await getServiceWorkerInstance();

    try {
      await deleteToken(messaging); // help us to renew token base on user revisit
    } catch (e) {
      console.error('[ep_push_notification]: deleteToken', e.message);
    }

    const currentToken = await getToken(messaging, {
      vapidKey: publicVapidKey,
    });
    console.log('[ep_push_notification]: CRT', currentToken);
    return currentToken;
  } catch (e) {
    console.error('[ep_push_notification]: CRT', e.message);
  }
};

export default getRegisterationToken;
