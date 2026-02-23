import Link from 'next/link'
import styles from './Navigation.module.css'

const DEFAULT_LINKS = [
  { href: '/articles', label: 'Статьи' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/about', label: 'О нас' },
]

export default function Navigation({ links = DEFAULT_LINKS }) {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.item}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
