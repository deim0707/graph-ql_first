import {gql} from "@apollo/client";

// создание пользователя. пишем иначе, чем в интерфейсе граф кьюэль, когда писали бэк
export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
      createUser(input: $input) {
        id, username, age
      }
    }
`

// id, username, age - указали какие данные хотим получить в ответе