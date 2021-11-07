const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    
    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }
    
    input PostInput {
        id: ID
        title: String
        content: String
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    
    type Mutation {
        createUser(input: UserInput): User
    }
`);

module.exports = schema;

// восклицательным знаком помечаем обязательные поля
// input - создание. что-то похожее на ПОСТ

//type Query - описали запросы, что мы можем делать

/*
как мы делаем запрос конкретного пользователя:
    query {
    getUser(id: "1") {
        id, username
    }

получаем всех пользователей
    query {
      getAllUsers {
        id, username
      }
    }
}*/

/*создать пользователья и вернуть его возраст
mutation {
  createUser(input:{
    username:"Anna",
    age: 123,
    posts: [
      {
        id: 1,
        title: "статья 1",
        content: "Текст статьи1"
      },
    ]
  }) {
    age,id, posts {
      id, title, content
    }
  }
}
}*/
