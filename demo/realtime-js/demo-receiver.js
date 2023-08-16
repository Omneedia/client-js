var omneedia = require('../../dist/main/index')

var o = omneedia.createClient(
  //'https://great-goose-8.demo.omneedia.net',
  'https://unlucky-shrimp-38.demo.omneedia.net',
  'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6Im9tbmVlZGlhIiwiaWF0IjoxNjczODU2NTY5LCJleHAiOjE4Mjk2ODkyMDB9.WjjpLEmitxp1maOWhqjp8GUax7o3OuEvtVcdlNLfXn0'
)

var channel = o
  .channel('test')
  .subscribe((response) => {
    console.log(response)
    if (response.status === 'SUBSCRIBED') {
      /*setInterval(() => {
        channel.send({
          type: 'broadcast',
          event: 'cursor-pos',
          payload: { date: new Date() },
        })
      }, 1000)*/
    }
  })
  .on('presence', { event: 'join' }, (payload) => console.log('JOIN', payload))
  .on('presence', { event: 'leave' }, (payload) => console.log('LEAVE', payload))
  .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
