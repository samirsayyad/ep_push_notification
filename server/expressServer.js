'use strict';

const webpush = require('web-push');
const settings = require('ep_etherpad-lite/node/utils/Settings');

const config = {
  publicVapidKey: settings.ep_push_notification.publicVapidKey,
  privateVapidKey: settings.ep_push_notification.privateVapidKey,
};

webpush.setVapidDetails(
    'mailto:samir.saiad@gmail.com', config.publicVapidKey, config.privateVapidKey);


exports.expressCreateServer = (hookName, context) => {
  context.app.post(
      '/static/:padId/pluginfw/ep_push_notification/subscribe/:userId', async (req, res, next) => {
        const subscription = JSON.parse(req.headers.subscription);

        const payload = JSON.stringify({title: 'test'});

        console.log(subscription);

        webpush.sendNotification(subscription, payload).catch((error) => {
          console.error(error.stack);
        });
        res.status(201).json({});
      });
};
