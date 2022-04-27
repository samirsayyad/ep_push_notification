const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const topicServices = require('./services/topicServices');
const db = require('ep_etherpad-lite/node/db/DB');

// const urlEncodedParser = bodyParser.urlencoded({extended:false});
exports.expressCreateServer = (hookName, context) => {
  context.app.post(
      '/static/:padId/pluginfw/ep_push_notification/subscribeToTopic/:userId',
      jsonParser,
      async (req, res) => {
        try {
          const {padId, userId} = req.params;
          const {registrationToken} = req.body;

          // save registrationToken
          db.set(`ep_push_notification_registrationToken:${userId}_${padId}`, registrationToken);
          const result = await topicServices.subscribeTokenToTopic(
              registrationToken,
              padId
          );
          // save result data
          db.set(`ep_push_notification_subscribeTokenToTopic:${userId}_${padId}`, result.data);
          res.status(201).json(result.data || {});
        } catch (error) {
          console.log('[ep_push_notification]:', error.message);

          res.status(500).send(error.message);
        }
      }
  );

  context.app.post(
      '/static/:padId/pluginfw/ep_push_notification/sendMessageToTopic',
      jsonParser,
      async (req, res) => {
        try {
          const {padId} = req.params;
          const {title, body} = req.body;
          const result = await topicServices.sendMessageToTopic(
              title,
              body,
              padId
          );
          res.status(201).json(result.data || {});
        } catch (error) {
          console.log('[ep_push_notification]:', error.message);

          res.status(500).send(error.message);
        }
      }
  );

  context.app.post(
      '/static/:padId/pluginfw/ep_push_notification/sendMessageToUser/:userId',
      jsonParser,
      async (req, res) => {
        try {
          const {padId, userId} = req.params;
          const {title, body} = req.body;
          const result = await topicServices.sendMessageToTopic(
              title,
              body,
              padId
          );
          res.status(201).json(result.data || {});
        } catch (error) {
          console.log('[ep_push_notification]:', error.message);

          res.status(500).send(error.message);
        }
      }
  );
};
