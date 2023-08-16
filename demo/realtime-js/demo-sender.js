var omneedia = require('../../dist/main/index')

var o = omneedia.createClient(
  //'https://great-goose-8.demo.omneedia.net',
  'https://unlucky-shrimp-38.demo.omneedia.net',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6Im9tbmVlZGlhIiwiaWF0IjoxNjczODU2NTY5LCJleHAiOjE4Mjk2ODkyMDB9.WjjpLEmitxp1maOWhqjp8GUax7o3OuEvtVcdlNLfXn0'
)

;(async function () {
  var channel = o.channel('test')
  await channel
    .subscribe((response) => {
      console.log(response)
      if (response.status === 'SUBSCRIBED') {
        setInterval(() => {
          channel.send({
            type: 'broadcast',
            event: 'cursor-pos',
            payload: { x: Math.random(), y: Math.random() },
          })
        }, 100)
      }
    })
    .on('presence', { event: 'join' }, (payload) => console.log('JOIN', payload))
    .on('presence', { event: 'leave' }, (payload) => console.log('LEAVE', payload))
    .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log('-->', payload))
})()
