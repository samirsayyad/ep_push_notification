const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const topicServices = require('./services/topicServices');
// const urlEncodedParser = bodyParser.urlencoded({extended:false});
exports.expressCreateServer = (hookName, context) => {
  context.app.post(
      '/static/:padId/pluginfw/ep_push_notification/subscribeToTopic/:userId',
      jsonParser, async (req, res) => {
        try {
          console.log('Got body:', req.body);

          const {padId} = req.params;
          const {registrationToken} = req.body;
          const result = await topicServices.subscribeTokenToTopic(registrationToken, padId);
          console.log('result', result);
          res.status(201).send(result);
        } catch (error) {
          console.log('[ep_push_notification]:', error.message);

          res.status(500).send(error.message);
        }
      });


  context.app.post(
      '/static/:padId/pluginfw/ep_push_notification/sendMessageToTopic',
      jsonParser, async (req, res) => {
        try {
          console.log('Got body:', req.body);
          const {padId} = req.params;
          const {title, body} = req.body;
          const result = await topicServices.sendMessageToTopic(title, body, padId);
          res.status(201).json(result);
        } catch (error) {
          console.log('[ep_push_notification]:', error.message);

          res.status(500).send(error.message);
        }
      });
};
