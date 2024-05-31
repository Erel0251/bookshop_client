import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query GetBooks(
    $search: String
    $category: String
    $rating: Float
    $fromPrice: Float
    $toPrice: Float
    $offset: Float
    $limit: Float
    $sortBy: String
    $order: String
  ) {
    books(
      search: $search
      category: $category
      rating: $rating
      fromPrice: $fromPrice
      toPrice: $toPrice
      offset: $offset
      limit: $limit
      sortBy: $sortBy
      order: $order
    ) {
      total
      data {
        id
        title
        author
        publisher
        img_urls
        price
        sale_price
        status
        currency
        inventory
      }
    }
  }
`;
