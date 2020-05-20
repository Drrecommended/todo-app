import React, { useState, useEffect } from 'react'
import '../styles/TodoList.css'
import { useTodo } from '../hooks'
import { FaAngleDown } from 'react-icons/fa'

function Todolist() {
    const [todoText, setTodoText] = useState('')
    const { todos, addTodo, removeTodo, getTodoList } = useTodo('todoEffect')
    
    useEffect(() => {
        getTodoList()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        addTodo(todoText)
        setTodoText('')
    }

    

    return (
        <div>
            <h1 className="todoTitle">TODOS</h1>
            <div className="TodoList">
                <form className="flexForm" onSubmit={handleSubmit}>
                    <FaAngleDown />
                    <input 
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    placeholder="what needs to be done?" 
                    />
                </form>
                <ul>
                    {todos.map(todo => {
                        return (
                        <li>
                            <input type="checkbox"/>
                            <span className="todoItems">{todo.text}</span>
                            <button className="x" onClick={() => removeTodo(todo.id)}>x</button>
                            <div className="todoStats">
                                <div></div>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    ) 
}

export default Todolist