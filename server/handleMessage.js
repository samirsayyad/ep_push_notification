const sendMessageToAllSafariAgent =
require('./messageMethods/sendMessageToAllSafariAgent').sendMessageToAllSafariAgent;

exports.handleMessage = (hookName, context, callback) => {
  let isPlugin = false;
  if (context) {
    if (context.message && context.message) {
      if (context.message.type === 'COLLABROOM') {
        if (context.message.data) {
          if (context.message.data.type) {
            if (context.message.data.type === 'ep_push_notification') {
              isPlugin = true;
            }
          }
        }
      }
    }
  }
  if (!isPlugin) {
    return false;
  }

  const message = context.message.data;
  if (message.action === 'ep_push_notification_sendMessageToAllSafariAgent') {
    sendMessageToAllSafariAgent(message);
  }

  if (isPlugin === true) {
    return [];
  } else {
    return true;
  }
};
