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
    username: String
    email: String
    password: String
    savedBooks: [String]
}

type Auth {
    token: ID
    user: User
}

type Query {
    me: [User]!
    book: [Book]!
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    addBook(authors:[String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;
