import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query GetBooks(
    $search: String
    $categories: [String!]
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
      categories: $categories
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
        category {
          name
        }
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

export const DASHBOARD_BOOKS_QUERY = gql`
  query GetDashboardBooks {
    books(limit: 8) {
      data {
        id
        title
        author
        publisher
        img_urls
        price
        sale_price
        currency
        inventory
      }
    }
    sale {
      promotion_books {
        detail_id
        id
        title
        author
        publisher
        img_urls
        price
        sale_price
        currency
      }
    }
    recommend {
      promotion_books {
        detail_id
        id
        title
        author
        publisher
        img_urls
        price
        sale_price
        currency
      }
    }
  }
`;
