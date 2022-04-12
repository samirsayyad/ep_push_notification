# ep_push_notification

It's going to handle by Firebase topic https://firebase.google.com/docs/cloud-messaging/manage-topics
This plugin will subscribe users of each pad automatically to the related topic and provide the ability to send push notifications to users who subscribed to a topic.

It's using rollup.js for converting ES6 to ES5 

The config need to setup in Etherpad settings.json 

```json
  "ep_push_notification":{
    "publicVapidKey": "publicVapidKey",
    "fcmServerKey": "fcmServerKey",
    "apiKey": "apiKey",
    "authDomain": "authDomain",
    "projectId": "projectId",
    "storageBucket": "storageBucket",
    "messagingSenderId": "messagingSenderId",
    "appId": "1:appId",
    "measurementId": "G-measurementId"
  }
 ```
