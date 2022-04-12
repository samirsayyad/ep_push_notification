const config = require('./configs');

/**
 *
 * @param {*} hook
 * @param {*} context
 * @param {*} callback
 * @returns
 */
exports.clientVars = async (hook, context) => ({
  // eslint-disable-next-line camelcase
  ep_push_notification: {
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
  },
});
