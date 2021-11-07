import {useEffect, useState, Fragment} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user";
import './App.css'

function App() {
    // получаем из граф кьюэль данные по написанному гетеру
    // refetch - повторяем запрос данных по гетеру из переданного аргумента
    // {pollInterval: 1000} вторым аргументом -  запрос будет вызывать каждые 1000 милисекунд. такой лонг пулинг
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
    // для этого запроса нужны параметры. мы их передадим во втором аргументе (в опциях)
    const {data: dataOneUser, loading: loadingOneUser} = useQuery(GET_USER, {
        variables: {
            id: 1
        }
    });
    console.log(dataOneUser)
    // используем описанную в /mutation мутацию для создания юзера // возвращает функцию, которая возвращает промис
    const [newUser] = useMutation(CREATE_USER);
    // здесь храним список пользователей // почему не берём сразу из Аполо?
    const [users, setUser] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);


    const updateUsers = () => {
        if (!loading) {
            setUser(data?.getAllUsers)
        }
    }
    useEffect(updateUsers, [data])

    // получает всех пользователей (в т.ч. добавленых). актуализирует данные
    const onGetUsers = e => {
        e.preventDefault();
        refetch()
    }

    const onCreateUser = (e) => {
        // раз находится внутри тега формы, то после нажатия будет обновлена страница. сбрасываем дефолтное поведение
        e.preventDefault();
        newUser({
            variables: {
                input: {username, age: Number(age)}
            }
        }).then((r) => {
            console.log('после создания пользователя нам вернулось', r)
            // очистка инпутов после создания
            setUsername('');
            setAge(0);
        })
    }

    if (loading) return <div>Загрузка...</div>
    return (
        <div className="App">
            <form>
                <div className='inputLine'>
                    <span>Имя:</span>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text"/>
                </div>
                <div className='inputLine'>
                    <span>Возраст:</span>
                    <input value={age} onChange={e => setAge(e.target.value)} type="number"/>
                </div>

                <div className='buttons'>
                    <button onClick={e => onCreateUser(e)}>Создать пользователя</button>
                    <button onClick={e => onGetUsers(e)}>Получить пользователя</button>
                </div>
            </form>

            <div className="users">
                {users.map(user => {
                    const {id, username, age} = user;
                    return (
                        <Fragment key={id}>
                            <div className='user'>
                                <div className='infoLine'>
                                    <span>айди</span>
                                    <span>{id}</span>
                                </div>
                                <div className='infoLine'>
                                    <span>Имя</span>
                                    <span>{username}</span>
                                </div>
                                <div className='infoLine'>
                                    <span>Возраст</span>
                                    <span>{age}</span>
                                </div>
                            </div>
                            <hr/>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
