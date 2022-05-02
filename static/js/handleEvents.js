import {checkPermissionAndHandleTopic} from './events/handlePermission';
import {sendNotificationToUser} from './events/handleNotifications';

const bindEvent = (element, eventName, eventHandler) => {
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
    element.attachEvent(`on${eventName}`, eventHandler);
  }
};

export const handleEvents = () => {
  bindEvent(window, 'ep_push_notification', (e) => {
    const eventName = e.detail.eventName;
    const data = e.detail.data;
    if (eventName === 'checkPermission') {
      checkPermissionAndHandleTopic();
    }
    if (eventName === 'sendNotificationToUser') {
      sendNotificationToUser(...data);
    }
  });
};
