const sanityClient = require('@sanity/client').default || require('@sanity/client')
const client = sanityClient({
  projectId: 'j89ku3zb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
})

client
  .fetch('*[_type == "article"] | order(publishedAt desc)[0...10]{_id, title, slug, publishedAt}')
  .then((res) => {
    console.log('Found', res.length, 'articles:')
    console.log(JSON.stringify(res, null, 2))
  })
  .catch((err) => console.error('Error:', err.message))
