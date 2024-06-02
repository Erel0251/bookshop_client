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
export const DETAIL_BOOK_QUERY = gql`
  query GetBook($id: String!) {
    book(id: $id) {
      id
      title
      img_urls
      author
      publisher
      overview
      isbn
      inventory
      price
      sale_price
      currency
      category {
        id
        name
      }
      reviews {
        title
        comment
        rating
      }
    }
  }
`;
