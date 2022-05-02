export const sendNotificationToUser = async (...data) => {
  try {
    if (!data) return null;
    const [padId, userId, title, body] = data;
    if (!padId || !userId || !title || !body) return null;
    const rawResponse = await fetch(
        `/static/${padId}/pluginfw/ep_push_notification/sendNotificationToUser/${userId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, body}),
        }
    );
    console.log('[sendNotificationToUser]: ', rawResponse);
    const result = await rawResponse.json();
    return result;
  } catch (e) {
    console.error('[sendNotificationToUser]: ', e.message);
  }
};
