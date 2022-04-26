const config = require('./configs');
const db = require('ep_etherpad-lite/node/db/DB');

/**
 *
 * @param {*} hook
 * @param {*} context
 * @param {*} callback
 * @returns
 */
exports.clientVars = async (hook, context) => {
  const padId = context.pad.id;
  const userId = context.clientVars.userId;
  const subscribeTokenToTopic = await
  db.get(`ep_push_notification_subscribeTokenToTopic:${userId}_${padId}`) || false;

  // eslint-disable-next-line camelcase
  return {ep_push_notification: {
    subscribeTokenToTopic,
    publicVapidKey: config.publicVapidKey,
    firebaseConfig: {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId,
    },
  }};
};
