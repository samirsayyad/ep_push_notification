import {checkPermissionAndHandleTopic} from './events/handlePermission';
import {handleEvents} from './handleEvents';
import {notifyMe} from './events/handleNotifications';

export const aceInitialized = () => {
  try {
    const modal = $('#gcpAuthentication').tmpl(clientVars);
    $('body').append(modal);
    handleEvents();
    checkPermissionAndHandleTopic();
  } catch (e) {
    console.log('[ep_push_notification]:', e.message);
  }
};


export const handleClientMessage_CUSTOM = (hook, context, cb) => {
  // const currentUserId = pad.getUserId();

  if (context.payload.action === 'ep_push_notification_sendMessageToAllSafariAgent') {
    if (navigator.userAgent.indexOf('Safari') !== -1 &&
    navigator.userAgent.indexOf('Chrome') === -1) {
      notifyMe(context.payload.data);
    }
  }
  return [];
};
