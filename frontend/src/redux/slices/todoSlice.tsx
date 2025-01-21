import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from './ITodo';

interface TodoState {
  todos: ITodo[];
}

type taskFilter = 'active' | 'completed' | 'all';

const getStorageTodos = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

const pushStorageTodos = (todos: ITodo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const initialState: TodoState = {
  todos: getStorageTodos(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      pushStorageTodos(state.todos);
    },
    removeTodo: (state, action) => {
      const findIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos.splice(findIndex, 1);
      pushStorageTodos(state.todos);
    },
    completedTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        pushStorageTodos(state.todos);
      }
    },
    filterTodos: (state, action) => {
      const filter: taskFilter = action.payload.filter;
      const allTodo = getStorageTodos();
      if (filter === 'active') {
        state.todos = allTodo.filter((todo: ITodo) => !todo.completed);
      }
      if (filter === 'completed') {
        state.todos = allTodo.filter((todo: ITodo) => todo.completed);
      }
      if (filter === 'all') {
        state.todos = getStorageTodos();
      }
    },
  },
});

export const { addTodo, removeTodo, completedTodo, filterTodos } = todoSlice.actions;
export default todoSlice.reducer;
