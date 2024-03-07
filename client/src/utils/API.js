import { gql } from '@apollo/client';

// GraphQL queries and mutations
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userData: CreateUserInput!) {
    createUser(userData: $userData) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($userData: LoginUserInput!) {
    loginUser(userData: $userData) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;

export const SEARCH_GOOGLE_BOOKS = gql`
  query SearchGoogleBooks($query: String!) {
    searchGoogleBooks(query: $query) {
      items {
        id
        volumeInfo {
          title
          authors
          description
          imageLinks {
            thumbnail
          }
        }
      }
    }
  }
`;
