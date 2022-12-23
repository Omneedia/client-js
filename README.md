# `client-js`

An isomorphic JavaScript client for Omneedia.

- **Documentation:** https://omneedia.com/docs/reference
- TypeDoc: https://supabase.github.io/omneedia/client-js/

## Usage

First of all, you need to install the library:

```sh
npm install @omneedia/client-js
```

Then you're able to import the library and establish the connection with the database:

```js
import { createClient } from '@omneedia/client-js'

// Create a single omneedia client for interacting with your database
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
```

### UMD

You can now use plain `<script>`s to import client-js from CDNs, like:

```html
<script src="https://cdn.jsdelivr.net/npm/@omneedia/client-js"></script>
```

or even:

```html
<script src="https://unpkg.com/@omneedia/client-js"></script>
```

Then you can use it from a global `omneedia` variable:

```html
<script>
  const { createClient } = omneedia
  const _omneedia = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

  console.log('Omneedia Instance: ', _omneedia)
  // ...
</script>
```

### ESM

You can now use type="module" `<script>`s to import client-js from CDNs, like:

```html
<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@omneedia/client-js/+esm'
  const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

  console.log('Omneedia Instance: ', omneedia)
  // ...
</script>
```
