import getRegisterationToken from './firebaseHandler';

export const subscribeUserToTopic = async (
    publicVapidKey,
    firebaseConfig,
    topic,
    etherpadUserId
) => {
  try {
    const registrationToken = await getRegisterationToken(
        publicVapidKey,
        firebaseConfig);
    const rawResponse = await fetch(
        `/static/${topic}/pluginfw/ep_push_notification/subscribeToTopic/${etherpadUserId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({registrationToken}),
        }
    );
    console.log('[subscribeUserToTopic]: ', rawResponse);
    const content = await rawResponse.json();
    return content;
  } catch (e) {
    console.error('[subscribeUserToTopic]: ', e.message);
  }
};

export const sendMessageToTopic = async (topic, title, body) => {
  try {
    const rawResponse = await fetch(
        `/static/${topic}/pluginfw/ep_push_notification/sendMessageToTopic`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, body}),
        }
    );
    console.log('[sendMessageToTopic]: ', rawResponse);
    const content = await rawResponse.json() || {};
    return content;
  } catch (e) {
    console.error('[sendMessageToTopic]: ', e.message);
  }
};
