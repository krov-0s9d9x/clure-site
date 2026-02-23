import Head from 'next/head'
import Link from 'next/link'
import client from '../../lib/sanity'
import urlFor from '../../lib/imageUrl'
import slugify from '../../lib/slugify'
import Navigation from '../../components/Navigation'
import ArticlesList from '../../components/ArticlesList'
import Footer from '../../components/Footer'
import styles from '../../components/ArticlePage.module.css'

const AUTHOR_NAV = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/about', label: 'О нас' },
]

const queryAllAuthors = `*[_type == "author"]{ _id, name, bio, image }`

const queryArticlesByAuthor = `*[_type == "article" && author._ref == $authorId] | order(publishedAt desc){
  _id, title, slug, publishedAt, mainImage, author->{name, image}
}`

export async function getStaticPaths() {
  const authors = await client.fetch(queryAllAuthors)
  const paths = (authors || []).map((a) => ({ params: { slug: slugify(a.name) } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const urlSlug = params.slug
  const allAuthors = await client.fetch(queryAllAuthors)
  const author = (allAuthors || []).find((a) => slugify(a.name) === urlSlug) || null

  if (!author) {
    return { notFound: true, revalidate: 60 }
  }

  const articles = await client.fetch(queryArticlesByAuthor, { authorId: author._id })

  return {
    props: { author, articles: articles || [] },
    revalidate: 60,
  }
}

export default function AuthorPage({ author, articles = [] }) {
  const imageUrl = author.image
    ? urlFor(author.image).width(400).height(400).auto('format').url()
    : null

  return (
    <>
      <Head>
        <title>{author.name} — Clure</title>
      </Head>
      <Navigation links={AUTHOR_NAV} />

      <div className={styles.page} style={{ minHeight: 'auto' }}>
        <main className={styles.body}>
          {/* ── Author header ── */}
          <header className={styles.header} style={{ padding: '120px 30px 40px', gap: 20 }}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={author.name}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
            <h1 className={styles.articleTitle} style={{ fontSize: 'clamp(48px, 10vw, 90px)' }}>{author.name}</h1>
            {author.bio && (
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.4,
                color: '#f6f8fb',
                maxWidth: 800,
                textAlign: 'center',
                letterSpacing: '-0.4px',
              }}>
                {author.bio}
              </p>
            )}
          </header>

          {/* ── Author's articles ── */}
          {articles.length > 0 && (
            <section style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div style={{ width: '100%', maxWidth: 900 }}>
                <ArticlesList items={articles} max={100} showAllButton={false} />
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />
    </>
  )
}
