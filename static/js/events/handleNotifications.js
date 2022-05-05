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

export const notifyMe = async (...data) => {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
    return;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    new Notification(data.title, {body: data.body});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(data.title, {body: data.body});
      }
    });
  }
};
