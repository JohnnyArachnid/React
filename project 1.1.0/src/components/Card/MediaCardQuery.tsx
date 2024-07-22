import { gql } from '@apollo/client';

export const GET_CHARACTERS_COUNT = gql`
  query {
    characters {
      info {
        count
      }
    }
  }
`;
export const GET_CHARACTERS = gql`
  query GetCharacter($id: ID!) {
  character(id: $id) {
    id
    name
    status
    species
    type
    gender
    origin {
      name
      type
      dimension
      residents {
        id
      }
      created
    }
    location {
      name
      type
      dimension
      residents {
        id
      }
      created
    }
    image
    episode {
      id
      name
      air_date
      episode
      characters {
        id
      }
      created
    }
    created
  }
}
`;

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string, type: string, dimension: string, residents: { id: string }[], created: string };
  location: { name: string, type: string, dimension: string, residents: { id: string }[], created: string };
  image: string;
  episode: { id: string, name: string, air_date: string, episode: string, characters: { id: string }[], created: string }[];
  created: string;
}

export interface QueryDataCount {
  characters: { info: { count: number } };
}

export interface QueryData {
  character: Character;
}
