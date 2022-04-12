const axios = require('axios');
const configs = require('../configs');

exports.subscribeTokenToTopic = async (token, topic) => new Promise((resolve, reject) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${configs.fcmServerKey}`;

    const subscribeTokenToTopicUrl = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;
    console.log(subscribeTokenToTopicUrl, configs);
    const result = axios.post(subscribeTokenToTopicUrl, {
      headers: {
        Authorization: `Bearer ${configs.fcmServerKey}`,
      },
    });
    resolve(result);
  } catch (error) {
    console.error('subscribeTokenToTopic', error.message, error.response);
    reject(error.message);
  }
});

exports.sendMessageToTopic = async (title, body, topic) => new Promise((resolve, reject) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${configs.fcmServerKey}`;

    const url = `https://fcm.googleapis.com/v1/projects/${configs.projectId}/messages:send`;
    console.log(url, configs);
    const message = {
      message: {
        topic,
        notification: {
          body,
          title,
        },
      },
    };
    const result = axios.post(url, message, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${configs.fcmServerKey}`,
      },
    });
    resolve(result.data);
  } catch (error) {
    console.error('sendMessageToTopic', error.message, error.response);
    reject(error.message);
  }
});
