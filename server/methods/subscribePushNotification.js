'use strict';

const webpush = require('web-push');
const settings = require('ep_etherpad-lite/node/utils/Settings');

const config = {
  publicVapidKey: settings.ep_push_notification.publicVapidKey,
  privateVapidKey: settings.ep_push_notification.privateVapidKey,
};

webpush.setVapidDetails(
    'mailto:samir.saiad@gmail.com', config.publicVapidKey, config.privateVapidKey);

exports.subscribePushNotification = async (message) => {
  const subscription = message.data;
  console.log(subscription, 'subscription');
  const payload = JSON.stringify({title: 'test'});

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error(error.stack);
  });
};
