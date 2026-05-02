import styles from './Header.module.css'

export default function Header({ total, onSearch, onOpenChat }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <PokeBall />
        <span className={styles.title}>Pokédex</span>
      </div>

      <div className={styles.search}>
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={(e) => onSearch(e.target.value.trim().toLowerCase())}
          autoComplete="off"
        />
      </div>

      <div className={styles.right}>
        {total > 0 && (
          <span className={styles.count}>{total} total</span>
        )}
        <button className={styles.aiBtn} onClick={onOpenChat}>
          <span className={styles.pulse} />
          Ask Prof. Claude
        </button>
      </div>
    </header>
  )
}

function PokeBall() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.6)" strokeWidth="2" />
      <path d="M1.5 20 A18.5 18.5 0 0 1 38.5 20 Z" fill="rgba(255,255,255,.45)" />
      <rect x="1.5" y="17.5" width="37" height="5" fill="rgba(255,255,255,.65)" />
      <circle cx="20" cy="20" r="6" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.65)" strokeWidth="2" />
      <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,.45)" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
