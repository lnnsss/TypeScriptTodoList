import { TodoElementInterface } from "../../../types/TodoElementInterface"
import s from "./../TodoList.module.css"

interface TodoElementProps {
    element: TodoElementInterface,
    handleDelTodo: Function,
    handleCheckTodo: Function,
}

export const TodoElement: React.FC<TodoElementProps> = ({element, handleDelTodo, handleCheckTodo}) => {
    return (
        <li className={s.todoElement}>
            <input type='checkbox' className={s.todoInput} id={`${element.id}`} checked={element.checked} onClick={() => handleCheckTodo(element.id)} />
            <label htmlFor={`element_${element.id}`} className={s.todoLabel}>{element.text}</label>
            <button className={s.delTodo} onClick={() => handleDelTodo(element.id)}>X</button>
        </li>
    )
}