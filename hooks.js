const eejs = require('ep_etherpad-lite/node/eejs/');

exports.eejsBlock_scripts = (hookName, args) => {
  args.content += eejs.require('ep_push_notification/templates/oAuth.html', {}, module);

  return [];
};
