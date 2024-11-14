import React, { useEffect, useState } from 'react';
import s from "./TodoList.module.css"
import { TodoElement } from './miniComponents/TodoElement';
import { TodoElementInterface } from '../../types/TodoElementInterface';



export const TodoList: React.FC = () => {

    const getTodoArrFromLS = (): TodoElementInterface[] => {
        const savedTodos = localStorage.getItem('todoArr');
        return savedTodos ? JSON.parse(savedTodos) : [];
    }

    const [inputValue, setInputValue] = useState("");
    const [todoArr, setTodoArr] = useState<TodoElementInterface[]>(getTodoArrFromLS());
    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value)
    }
    const handleAddBtnSubmit = (): void => {
        if (inputValue) {
            const newTodoEl: TodoElementInterface = {
                id: +(new Date()),
                checked: false,
                text: inputValue
            }
            setTodoArr([...todoArr, newTodoEl])
            setInputValue("")
        }
    }

    useEffect(() => {
        localStorage.setItem('todoArr', JSON.stringify(todoArr));
    }, [todoArr]);

    const handleDelTodo = (id: number): void => {
        setTodoArr(todoArr.filter(el => el.id !== id))
    }
    const handleCheckTodo = (id: number): void => {
        setTodoArr(todoArr.map(el => el.id === id ? {...el, checked: !el.checked} : el))
    }

    return (
        <div className={s.todoList}>
            <h1>ToDo List</h1>
            <div className={s.createNewTodo}>
                <input  type="text" placeholder="ToDo?" value={inputValue} onChange={handleChangeInputValue} />
                <button className={s.add} onClick={() => handleAddBtnSubmit()}>ADD</button>
            </div>
            <div>
                <ul className={s.todo}>
                    {todoArr.map(el => <TodoElement element={el} key={el.id} handleDelTodo={handleDelTodo} handleCheckTodo={handleCheckTodo} />)}
                </ul>
            </div>
        </div>
    )
}