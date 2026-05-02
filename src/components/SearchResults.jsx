import { useQuery } from '@apollo/client'
import { GET_POKEMON } from '../graphql/queries'
import PokemonCard from './PokemonCard'
import styles from './PokemonGrid.module.css'

export default function SearchResults({ query, onSelectPokemon }) {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name: query },
    skip: !query,
  })

  if (loading) return <div className={styles.state}>Searching...</div>
  if (error || !data?.pokemon) return <div className={styles.state}>No Pokémon found for "{query}".</div>

  const pk = data.pokemon
  const result = { id: pk.id, name: pk.name, artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pk.id}.png` }

  return (
    <div className={styles.wrap}>
      <div className={styles.regionBar}>
        <span className={styles.regionName}>Search results</span>
        <span className={styles.regionPill}>1 found</span>
      </div>
      <div className={styles.grid}>
        <PokemonCard pokemon={result} onClick={onSelectPokemon} />
      </div>
    </div>
  )
}
