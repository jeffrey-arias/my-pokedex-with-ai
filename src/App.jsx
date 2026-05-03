import { useState, useCallback } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql/client'
import Header from './components/Header'
import PokemonGrid from './components/PokemonGrid'
import SearchResults from './components/SearchResults'
import PokemonModal from './components/PokemonModal'
import ChatPanel from './components/ChatPanel'
import PokedexFrame from './components/PokedexFrame'
import styles from './App.module.css'

function Pokedex() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [total, setTotal] = useState(0)

  // Debounce search input
  const [searchTimer, setSearchTimer] = useState(null)
  const handleSearch = useCallback((value) => {
    clearTimeout(searchTimer)
    if (!value) { setSearchQuery(''); return }
    const t = setTimeout(() => setSearchQuery(value), 380)
    setSearchTimer(t)
  }, [searchTimer])
  return (
    <div className={styles.app}>
      <Header
        total={total}
        onSearch={handleSearch}
        onOpenChat={() => setChatOpen(true)}
      />

      <main className={styles.main}>
        {chatOpen ? (
          <ChatPanel onClose={() => setChatOpen(false)} />
        ) : (
          <>
            {searchQuery ? (
              <SearchResults
                query={searchQuery}
                onSelectPokemon={setSelectedPokemon}
              />
            ) : (
              <PokemonGrid
                onSelectPokemon={setSelectedPokemon}
                onTotalLoaded={setTotal}
              />
            )}

            {selectedPokemon && (
              <PokemonModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PokedexFrame>
        <Pokedex />
      </PokedexFrame>
    </ApolloProvider>
  )
}
