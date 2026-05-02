import { useQuery } from '@apollo/client'
import { GET_POKEMON } from '../graphql/queries'
import { TYPE_COLORS, STAT_LABELS } from '../constants'
import { useTypewriter } from '../hooks/useTypewriter'
import styles from './PokemonModal.module.css'

export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={`${pokemon.name} details`}>
        <ModalContent pokemon={pokemon} onClose={onClose} />
      </div>
    </div>
  )
}

function ModalContent({ pokemon, onClose }) {
  const num = String(pokemon.id).padStart(4, '0')
  const { displayed, done } = useTypewriter(pokemon.name, 65)

  const { loading, data } = useQuery(GET_POKEMON, {
    variables: { name: pokemon.name },
    skip: !done, // wait for typewriter to finish before fetching
  })

  const pk = data?.pokemon

  return (
    <>
      <div className={styles.hero}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        <p className={styles.num}>#{num}</p>
        <h2 className={styles.name}>
          {displayed}
          {!done && <span className={styles.cursor} />}
        </h2>
        <div className={styles.artWrap}>
          <img src={pokemon.artwork} alt={pokemon.name} />
        </div>
      </div>

      <div className={styles.body}>
        {loading && <p className={styles.loading}>Loading data...</p>}
        {pk && <PokemonDetails pk={pk} />}
      </div>
    </>
  )
}

function PokemonDetails({ pk }) {
  return (
    <>
      <div className={styles.types}>
        {pk.types?.map((t) => {
          const color = TYPE_COLORS[t.type.name] || '#888'
          return (
            <span
              key={t.type.name}
              className={styles.typeBadge}
              style={{ background: `${color}22`, color, borderColor: `${color}66` }}
            >
              {t.type.name}
            </span>
          )
        })}
      </div>

      <div className={styles.infoGrid}>
        <InfoCell label="Height" value={`${(pk.height / 10).toFixed(1)} m`} />
        <InfoCell label="Weight" value={`${(pk.weight / 10).toFixed(1)} kg`} />
      </div>

      <p className={styles.sectionLabel}>Base Stats</p>
      {pk.stats?.map((s) => <StatRow key={s.stat.name} name={s.stat.name} value={s.base_stat} />)}

      <p className={styles.sectionLabel}>Abilities</p>
      <div className={styles.tags}>
        {pk.abilities?.slice(0, 3).map((a) => (
          <span key={a.ability.name} className={styles.tag}>{a.ability.name}</span>
        ))}
      </div>

      <p className={styles.sectionLabel}>Moves</p>
      <div className={styles.tags}>
        {pk.moves?.slice(0, 4).map((m) => (
          <span key={m.move.name} className={styles.tag}>{m.move.name}</span>
        ))}
      </div>
    </>
  )
}

function InfoCell({ label, value }) {
  return (
    <div className={styles.infoCell}>
      <p className={styles.infoLabel}>{label}</p>
      <p className={styles.infoValue}>{value}</p>
    </div>
  )
}

function StatRow({ name, value }) {
  const pct = Math.round((value / 255) * 100)
  const color = value >= 100 ? '#4aaec2' : value >= 60 ? '#5ba85a' : '#c08040'
  return (
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{STAT_LABELS[name] || name}</span>
      <span className={styles.statValue}>{value}</span>
      <div className={styles.statTrack}>
        <div
          className={styles.statFill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
