let rs;

self.addEventListsner('message', (event) => {
  console.log(event.data);
  rs = event.data;
});

self.addEventListener('install', (event) => {
  console.log(event);
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log(event);
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', async (event) => {
  if (
    event.request.url.includes('stream')
  ) {
  console.log(rs);
  event.respondWith(
    new Response(rs, {
      headers: {'Content-Type': 'audio/opus+ogg'}
    })
  );
  }
});
