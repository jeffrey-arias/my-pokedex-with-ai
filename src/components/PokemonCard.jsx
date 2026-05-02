import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon, onClick }) {
  const num = String(pokemon.id).padStart(4, '0')

  return (
    <div
      className={styles.card}
      onClick={() => onClick(pokemon)}
      role="button"
      tabIndex={0}
      aria-label={`View ${pokemon.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(pokemon)}
    >
      <div className={styles.imgWrap}>
        <img src={pokemon.artwork} alt={pokemon.name} loading="lazy" />
      </div>
      <div className={styles.num}>{num}</div>
    </div>
  )
}
