import subscribeUserToTopic from './firebase/subscribeUserToTopic';

export const aceInitialized = () => {
  try {
    subscribeUserToTopic(
        clientVars.ep_push_notification.publicVapidKey,
        clientVars.ep_push_notification.firebaseConfig, pad.getPadId(), pad.getUserId());
  } catch (e) {
    console.log('[ep_push_notification]:', e.message);
  }
};
