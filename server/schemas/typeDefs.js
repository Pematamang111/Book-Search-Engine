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

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(authors:[String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
    
}
`;

module.exports = typeDefs;
