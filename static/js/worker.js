'use strict';

console.log('Loaded service worker!');

self.addEventListener('push', (ev) => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: 'Hello, World!',
    icon: 'https://docs.plus/static/images/logo.png',
  });
});