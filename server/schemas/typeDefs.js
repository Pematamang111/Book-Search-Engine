const typeDefs = `
type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

type Auth {
    token: ID
    user: User
}

type Query {
    user: [User]!
    book: [Book]!
    me: User!
}

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(title: String!): User
    removeBook(bookId: ID!): User
    saveBook(bookData: BookInput!): User
    
}
`;

module.exports = typeDefs;
//addBook(authors:[String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
