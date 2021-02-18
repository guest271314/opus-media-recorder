var rs;

self.onmessage = (e) => {
  console.log(e.data);
  rs = e.data;
}
/*
let readable = (async () => {
  const response = await fetch(
    'https://mirrors.creativecommons.org/movingimages/webm/ScienceCommonsJesseDylan_240p.webm',
    { cache: 'no-store' }
  );
  console.log(response.body);
  if (rs) {
    console.log(rs);
    return new Response(rs);
  }
  return new Response(response.body);
})();

*/

self.addEventListener('install', (event) => {
  console.log(event);
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log(event);
  event.waitUntil(self.clients.claim());
});

let n = false;

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
/*
event.respondWith((async () => {
    const response = await fetch('index.php?start=true');
    return new Response(response.body, {
      headers: response.headers
    });

  })());
*/
 //  event.respondWith(fetch('./index.php?start=true'))
   // console.log('ServiceWorker unregistered:', await self.registration.unregister());
  }

});
/*
addEventListener("fetch", event => {
  event.respondWith(fetchAndStream(event.request))
})
*/
async function fetchAndStream(request) {
  // Fetch from origin server.
  //let response = await fetch(request)

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  //let { readable, writable } = new TransformStream()

  // Start pumping the body. NOTE: No await!
  //rs.pipeTo(writable)

  // ... and deliver our Response while that’s running.
  const response = new Response(rs, {headers:{'Content-Type':'audio/x-opus+ogg'}, statusCode: 206});
  console.log(response.body);
  return response;
}
