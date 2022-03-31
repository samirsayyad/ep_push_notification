'use strict';

const subscribePushNotification =
require('./methods/subscribePushNotification').subscribePushNotification;

exports.handleMessage = (_hookName, context, callback) => {
  let isRocketChatMessage = false;
  if (context) {
    if (context.message && context.message) {
      if (context.message.type === 'COLLABROOM') {
        if (context.message.data) {
          if (context.message.data.type) {
            if (context.message.data.type === 'ep_push_notification') {
              isRocketChatMessage = true;
            }
          }
        }
      }
    }
  }
  if (!isRocketChatMessage) {
    return false;
  }


  const message = context.message.data;

  if (message.action === 'sendPushNotification') {
    subscribePushNotification(message);
  }
};
