'use strict';
const settings = require('ep_etherpad-lite/node/utils/Settings');

exports.clientVars = async (hook, context, callback) => ({
  // eslint-disable-next-line camelcase
  ep_push_notification: {
    publicVapidKey: settings.ep_push_notification.publicVapidKey,
  },
});
