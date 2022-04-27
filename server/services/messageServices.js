const axios = require('axios');
const configs = require('../configs');

exports.sendMessageToUser =
async (title, body, registrationToken) => new Promise((resolve, reject) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${configs.fcmServerKey}`;

    const url = 'https://fcm.googleapis.com/fcm/send';
    console.log(url, configs);
    const data = {
      data: {
        notification: {
          body,
          title,
        },
      },
      to: registrationToken,
    };
    const result = axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${configs.fcmServerKey}`,
      },
    });
    resolve(result.data);
  } catch (error) {
    console.error('sendMessageToUser', error.message, error.response);
    reject(error.message);
  }
});
