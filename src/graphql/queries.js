import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query pokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        id
        name
        artwork
      }
    }
  }
`

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      name
      id
      types {
        type { name }
      }
      height
      weight
      stats {
        stat { name }
        base_stat
      }
      moves {
        move { name }
      }
      abilities {
        ability { name }
      }
    }
  }
`
