var client = omneedia.createClient(
  'http://localhost:8000',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTcyNjg2MTQ4OH0.fsIJu0uDoMBBxXnHuoXtMlwF4sGHxkFGkLpFDfKuV9g'
)

client.auth.onAuthStateChange(async (event, session) => {
  console.log('event: ', event)
  console.log(session)
  if (event == 'SIGNED_OUT') {
    document.querySelector('.auth').style.display = 'none'
    document.querySelector('.login').style.display = 'block'
  }
  if (event == 'SIGNED_IN') {
    document.querySelector('.auth').style.display = 'block'
    document.querySelector('.login').style.display = 'none'
    const user = await client.auth.getUser()
    document.querySelector('#info').innerHTML = JSON.stringify(user, null, 4)
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  const buttons = document.querySelectorAll('button')

  buttons.forEach((btn) => {
    btn.addEventListener('click', (btn) => {
      switch (btn.target.id) {
        case 'signin':
          return client.auth.signInWithPassword({
            email: 'szucatti@omneedia.com',
            password: 'dreams',
          })
        case 'signup':
          return client.auth.signUp({
            email: 'szucatti@omneedia.com',
            password: 'dreams',
            options: {
              data: {
                first_name: 'Stéphane',
                last_name: 'Zucatti',
              },
            },
          })
        case 'login_via_cerema':
          return client.auth.signInWithProvider({
            provider: 'cerema',
          })
        case 'login_via_github':
          return client.auth.signInWithProvider({
            provider: 'github',
          })
        case 'login_via_google':
          return client.auth.signInWithProvider({
            provider: 'google',
            config: {
              callback: location.href,
            },
          })
        case 'login_via_magic_link':
          return client.auth.signInWithEmail({
            email: 'szucatti@omneedia.com',
          })
        case 'logout':
          return client.auth.signOut()
        case 'recover_password':
          var redirectURI = location.origin + location.pathname
          redirectURI = redirectURI.substring(0, redirectURI.lastIndexOf('/'))
          return client.auth.resetPasswordForEmail({
            email: 'szucatti@omneedia.com',
            redirectTo: redirectURI + '/recover.html',
          })
        case 'recover':
          return client.auth.updateUser({
            password: 'toto',
          })
        default:
          console.log('not implemented')
          break
      }
    })
  })
  if (document.querySelector('.login')) {
    if (client.auth.isAuthenticated()) {
      document.querySelector('.auth').style.display = 'block'
      document.querySelector('.login').style.display = 'none'
      const user = await client.auth.getUser()
      document.querySelector('#info').innerHTML = JSON.stringify(user, null, 4)
    } else {
      document.querySelector('.auth').style.display = 'none'
      document.querySelector('.login').style.display = 'block'
    }
  }
})
