import styles from './Footer.module.css'

const BG_URL = '/images/bg.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Blurred background */}
      <div className={styles.bg} aria-hidden="true">
        <img src={BG_URL} alt="" className={styles.bgImg} />
        <div className={styles.bgOverlay} />
      </div>

      {/* Content */}
      <div className={styles.inner}>
        <p className={styles.brand}>Clure.</p>

        <div className={styles.links}>
          <div className={styles.col}>
            <span className={styles.label}>ссылки</span>
            <ul className={styles.list}>
              <li><a href="/articles">Статьи</a></li>
              <li><a href="/playlists">Плейлисты</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </div>
          <div className={styles.col}>
            <span className={styles.label}>связь</span>
            <ul className={styles.list}>
              <li><a href="https://t.me/cluremag" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
