export const sendMessageToAllSafariAgent = (padId, userId, title, body) => {
  const data = {title, body};
  const message = {
    type: 'ep_push_notification',
    action: 'ep_push_notification_sendMessageToAllSafariAgent',
    userId,
    data,
    padId,
  };
  pad.collabClient.sendMessage(message); // Send the chat position message to the server
};
