import getRegisterationToken from './firebaseHandler';

const subscribeUserToTopic = async (
    publicVapidKey,
    firebaseConfig,
    topic,
    etherpadUserId
) => {
  const registrationToken = await getRegisterationToken(
      publicVapidKey,
      firebaseConfig
  );
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
  //   const content = await rawResponse.json();
  console.log('[ep_push_notification]: ', rawResponse);
};

export default subscribeUserToTopic;
