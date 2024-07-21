import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box } from '@mui/material';
import Portal from '../Portal/Portal';
import './DataLoader.css';

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

  if (errorCount || errorCharacters) {
    return (
      <Box className='Container'>
        <Portal displayData={`Error fetching data: ${errorCount ? 'character count: ' + errorCount.message : 'charactes: ' + errorCharacters.message}`} isError />
      </Box>
    );
  }

  if (loadingCount || loadingCharacters || loadingData) {
    return (
      <Box className='Container'>
        <Portal displayData={'Loading ...'} />
      </Box>
    );
  }

  return React.cloneElement(children, { characterCount, dataCharacters });
}
