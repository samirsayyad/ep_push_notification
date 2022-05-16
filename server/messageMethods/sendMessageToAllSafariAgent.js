const etherpadFuncs = require('../services/etherpadSharedFunc');

exports.sendMessageToAllSafariAgent = (message) => {
  const msg = {
    type: 'COLLABROOM',
    data: {
      type: 'CUSTOM',
      payload: message,
    },
  };
  etherpadFuncs.sendToRoom(msg);
};
