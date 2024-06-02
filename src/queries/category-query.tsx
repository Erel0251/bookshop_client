import { gql } from '@apollo/client';

export const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
      father {
        id
        name
      }
    }
  }
`;
