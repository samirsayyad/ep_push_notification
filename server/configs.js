const settings = require('ep_etherpad-lite/node/utils/Settings');
module.exports = {
  publicVapidKey: settings.ep_push_notification.publicVapidKey,
  fcmServerKey: settings.ep_push_notification.fcmServerKey,
  apiKey: settings.ep_push_notification.apiKey,
  authDomain: settings.ep_push_notification.authDomain,
  projectId: settings.ep_push_notification.projectId,
  storageBucket: settings.ep_push_notification.storageBucket,
  messagingSenderId: settings.ep_push_notification.messagingSenderId,
  appId: settings.ep_push_notification.appId,
  measurementId: settings.ep_push_notification.measurementId,
};
