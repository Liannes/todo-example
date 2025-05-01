import { createSlice } from '@reduxjs/toolkit';

import { ITodo } from 'types/ITodo';
import { TodoState } from 'types/ITodoState';

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
      const findIndex = state.todos.findIndex((todo: ITodo) => todo.id === action.payload.id);
      state.todos.splice(findIndex, 1);
      pushStorageTodos(state.todos);
    },

    completedTodo: (state, action) => {
      const todo = state.todos.find((todo: ITodo) => todo.id === action.payload.id);
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

    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const allTodo = getStorageTodos();

      allTodo.forEach((todo: ITodo) => {
        if (todo.id === id) {
          todo.text = text;
        }
      });

      pushStorageTodos(allTodo);
      state.todos = allTodo;
    },
  },
});

export const { addTodo, removeTodo, completedTodo, filterTodos, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
