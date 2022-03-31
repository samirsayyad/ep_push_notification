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

        webpush.sendNotification({
          endpoint: 'https://fcm.googleapis.com/fcm/send/dAVq2K41Mwk:APA91bEACt1bGtEXrfdKUi9xO8_1W4eaP5cUSMc7GlYafwStI6wwyqxNcqcXNCYd_bl8ap8ScmQ6DI96ZNKMM8e7jwGfQM_87gP81FPfZI9ouOc0qKyzwlDCwwfEOpIFMouHByvt53xE',
          expirationTime: null,
          keys: {
            p256dh: 'BOXoueKnn_vtYVWWaTCp6vvPBR_wJBfQ7HBuSZrX9DS49Z2X6Cc9wzF1TL3Jiol613fQ1sRUQYGQLx7jiVdRfCw',
            auth: 'ZSKP9CsnhySbRC5innT4XA',
          },
        }
        , payload).catch((error) => {
          console.error(error.stack);
        });

        webpush.sendNotification({
          endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABiRWI-dcXMUl9kD3B43yCJZY_BO3NceN-nD81KTNLUmFfL4x4N07-Zrvzf9Frj2jJtF4ujZmP7k4sigb7a4qhugFL3ZnOUGqh9TjU0ofUJHaee9eEGzPIJv3k08E7AcdKLz7fpIOWlFmElvUsSde8eR1g6snVdsGsUe665fQPhudvVAWo',
          expirationTime: null,
          keys: {
            auth: '2wuQiAG4CffzWfa3XStksQ',
            p256dh: 'BLboKEtJPqo26dga5fJ_ClOG4X9-ICQh-6zGgnqLOGTcsweep1VX43BW6-0F9VgApG2jXlfoGLfO1BAVa1le8EM',
          },
        }
        , payload).catch((error) => {
          console.error(error.stack);
        });

        res.status(201).json({});
      });
};
