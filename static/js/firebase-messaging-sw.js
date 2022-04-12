console.log('Loaded service worker!');

self.addEventListener('push', (ev) => {
  const data = ev.data.json();
  console.log('[ep_push_notification]:', data);
  self.registration.showNotification(data.title, {
    body: 'Hello, World!',
    icon: 'https://docs.plus/static/images/logo.png',
  });
});
