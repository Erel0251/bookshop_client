import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query GetBooks(
    $search: String
    $categories: [String!]
    $publishers: [String!]
    $rating: Float
    $fromPrice: Float
    $toPrice: Float
    $offset: Float
    $type: String
    $limit: Float
    $sortBy: String
    $order: String
  ) {
    books(
      search: $search
      categories: $categories
      publishers: $publishers
      rating: $rating
      fromPrice: $fromPrice
      toPrice: $toPrice
      type: $type
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

export const PUBLISHERS_QUERY = gql`
  query GetPublishers {
    publishers
  }
`;

export const DETAIL_BOOK_QUERY = gql`
  query GetBook(
    $id: String!
    $rating: Float
    $offset: Float
    $limit: Float
    $sortBy: String
    $order: String
  ) {
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
      status
      sale_price
      currency
      category {
        id
        name
      }
      reviews(
        rating: $rating
        offset: $offset
        limit: $limit
        sortBy: $sortBy
        order: $order
      ) {
        total
        average
        details
        data {
          title
          rating
          comment
          created_at
        }
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
        status
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
    popular {
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
`;
