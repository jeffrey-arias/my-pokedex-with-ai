import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from '../graphql/queries'
import { PAGE_SIZE } from '../constants'
import PokemonCard from './PokemonCard'
import styles from './PokemonGrid.module.css'

export default function PokemonGrid({ searchQuery, onSelectPokemon, onTotalLoaded }) {
  const [page, setPage] = useState(1)

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: PAGE_SIZE, offset: PAGE_SIZE * (page - 1) },
    skip: !!searchQuery,
    onCompleted: (d) => onTotalLoaded?.(d.pokemons.count),
  })

  const pokemons = data?.pokemons?.results ?? []
  const total = data?.pokemons?.count ?? 0
  const pageCount = Math.ceil(total / PAGE_SIZE)

  if (loading) return <div className={styles.state}>Loading Pokémon...</div>
  if (error) return <div className={styles.state}>Error loading Pokémon.</div>
  if (!pokemons.length) return <div className={styles.state}>No Pokémon found.</div>

  return (
    <div className={styles.wrap}>
      <div className={styles.regionBar}>
        <span className={styles.regionName}>All Regions</span>
        <span className={styles.regionPill}>
          {PAGE_SIZE * (page - 1) + 1}–{Math.min(PAGE_SIZE * page, total)} / {total}
        </span>
      </div>

      <div className={styles.grid}>
        {pokemons.map((pk) => (
          <PokemonCard key={pk.id} pokemon={pk} onClick={onSelectPokemon} />
        ))}
      </div>

      {pageCount > 1 && (
        <div className={styles.pager}>
          <button
            className={styles.pgBtn}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          <span className={styles.pgInfo}>{page} / {pageCount}</span>
          <button
            className={styles.pgBtn}
            disabled={page === pageCount}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
