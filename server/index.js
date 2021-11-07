const express = require('express'); // импортируем экспресс
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema'); // созданная нами схема

const PORT = 5001;
const users = [{id: 1, username: 'Kol9', age: 99}]; // ТИПА база данных, которая была бы в реальном проекте

const app = express(); // экземпляр приложения из экпресса

app.use(cors());

const createUser = (input) => {
  const id = Date.now();
  return {
      id, ...input
  }
}

// резволвер. внутри должна быть реализация методов описанных в Schemd
const root = {
    getAllUsers: () => {
        // в реальном приложении тут были бы запросы к БД
        return users;
    },
    getUser: ({id}) => {
        // в реальном приложении тут были бы запросы к БД
        return users.find(user => user.id == id);
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user);
        return user;
    }
}


app.use('/graphql', graphqlHTTP({
    graphiql: true, // включает графический интерфейс в браузере, для удобства тестирования
    schema,
    rootValue: root
}))

app.listen(PORT, () => console.log('сервер стартовал на порту:', PORT))

