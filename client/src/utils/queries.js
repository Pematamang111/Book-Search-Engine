import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
        authors
        image
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      savedBooks
    }
  }
`;

export const QUERY_BOOK = gql`
  query books($_id: String) {
    books(_id: $_id) {
      _id
      authors
      description
      bookID
      image
      link 
      title
    }
  }
`;


