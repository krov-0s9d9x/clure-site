import { useRouter } from 'next/router'
import styles from './Articles.module.css'
import urlFor from '../lib/imageUrl'
import slugify from '../lib/slugify'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function ArticleCard({ title = 'Article title', image = null, slug = null, publishedAt = null, category = null, author = null }) {
  const router = useRouter()
  const imageUrl = image ? urlFor(image).width(800).height(800).auto('format').url() : null
  const altText = image?.alt || title
  const date = formatDate(publishedAt)
  const authorName = author?.name || null
  const authorSlug = authorName ? slugify(authorName) : null

  const handleCardClick = () => {
    if (slug) router.push(`/articles/${slug}`)
  }

  return (
    <article
      className={styles.card}
      onClick={handleCardClick}
      style={slug ? { cursor: 'pointer' } : undefined}
    >
      {/* Full-bleed image */}
      {imageUrl ? (
        <img src={imageUrl} alt={altText} className={styles.image} />
      ) : (
        <span className={styles.imagePlaceholder} />
      )}
      {/* Gradient overlay */}
      <span className={styles.gradient} aria-hidden="true" />
      {/* Content box */}
      <span className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.meta}>
          {authorName && (
            <a
              href={`/authors/${authorSlug}`}
              className={styles.authorLink}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                router.push(`/authors/${authorSlug}`)
              }}
            >
              {authorName}
            </a>
          )}
          {authorName && date && <span className={styles.dot}>·</span>}
          {date && <span>{date}</span>}
        </span>
      </span>
    </article>
  )
}
