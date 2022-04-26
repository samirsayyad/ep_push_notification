import {checkPermissionAndHandleTopic} from './handlePermission';
import {handleEvents} from './handleEvents';

export const aceInitialized = () => {
  try {
    handleEvents();
    checkPermissionAndHandleTopic();
  } catch (e) {
    console.log('[ep_push_notification]:', e.message);
  }
};
