// 1. imports
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'

// 2. action definitions
const GET_TODOS = 'todo/GET_TODOS'
// const ADD_TODO = 'todo/ADD_TODO'
const REMOVE_TODO = 'todo/REMOVE_TODO'

// 3. initial state
const initialState = {
  todos: []
}

const makeId = function () {
    let id = 0;
    return () => id++
}

const id = makeId()


// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
        return {
            ...state,
            todos: action.payload
        }
    case REMOVE_TODO:
        return {
            ...state,
            todos: state.todos.filter(todo => action.payload !== todo.id)
        }
    default:
      return state
  }
}

// 5. action creators
function addTheTodo(text) {
    return dispatch => {
        axios.post('/todos', { text, status: 'active'})
        .then(resp => {
            dispatch(getTodos())
        })
    }

}

function removeTheTodo(id) {
    return dispatch => {
        axios.delete('/todos/' + id).then(resp => {
            dispatch({
                type: REMOVE_TODO,
                payload: id 
            })
        })
    }
  }

function getTodos() {
    return dispatch => {
        axios.get('/todos').then(resp => {
            dispatch({
                type: GET_TODOS,
                payload: resp.data
            })
        })
    }
}


// 6. custom hook
export function useTodo() {
  const dispatch = useDispatch()
  const todos = useSelector(appState => appState.todoState.todos)

  const addTodo = (text) => dispatch(addTheTodo(text))
  const removeTodo = (id) => dispatch(removeTheTodo(id))
  const getTodoList = () => dispatch(getTodos())


  return { todos, addTodo, removeTodo, getTodoList }
}
