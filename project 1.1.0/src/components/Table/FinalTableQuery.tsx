import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filterName: String, $filterStatus: String, $filterGender: String) {
    characters(page: $page, filter: { name: $filterName, status: $filterStatus, gender: $filterGender }) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          id
        }
      }
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
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: { id: string }[];
}

export interface QueryData {
  characters: {
    info: { count: number, pages: number },
    results: Character[]
  }
}