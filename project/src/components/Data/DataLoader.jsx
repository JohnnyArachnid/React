import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHARACTERS_COUNT = gql`
  query {
    characters {
      info {
        count
      }
    }
  }
`;

const GET_CHARACTERS = gql`
  query GetCharacterById($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
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

export default function DataLoader({ children }) {
  const [characterCount, setCharacterCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  const { loading: loadingCount, error: errorCount, data: dataCount } = useQuery(GET_CHARACTERS_COUNT);

  useEffect(() => {
    if (!loadingCount && dataCount) {
      setCharacterCount(dataCount.characters.info.count);
      setLoadingData(false);
    }
  }, [loadingCount, dataCount]);

  const { loading: loadingCharacters, error: errorCharacters, data: dataCharacters } = useQuery(GET_CHARACTERS, {
    variables: { ids: Array.from({ length: characterCount }, (_, i) => i + 1) },
    skip: characterCount <= 0 || loadingData
  });

  if (loadingCount || loadingCharacters || loadingData) return <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)', 
    zIndex: 9999, 
    color: 'white',
    }}
  >
    <p>Loading...</p>
  </div>;
  if (errorCount) return <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)', 
    zIndex: 9999, 
    color: 'white',
    }}
  >
    <p>Error fetching character count: {errorCount.message}</p>;
  </div>;
  if (errorCharacters) return <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)', 
    zIndex: 9999, 
    color: 'white',
    }}
  >
    <p>Error fetching characters: {errorCharacters.message}</p>;
  </div>;
  return React.cloneElement(children, { characterCount, dataCharacters });
};
