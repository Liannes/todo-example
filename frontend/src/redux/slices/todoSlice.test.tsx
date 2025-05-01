import '@testing-library/jest-dom';
import { ITodo } from 'types/ITodo';
import todoSlice, { addTodo, completedTodo, filterTodos, removeTodo } from './todoSlice';

interface TodoState {
  todos: ITodo[];
}

describe('todoSlice', () => {
  const initState: TodoState = {
    todos: [],
  };

  const task = { id: 1, text: 'test', completed: false };
  it('Проверяем инициализации state', () => {
    expect(todoSlice(undefined, { type: 'unknown' })).toEqual(initState);
  });

  it('Проверяем добавление задачи', () => {
    const action = addTodo(task);
    const state = todoSlice(initState, action);

    expect(state.todos.length).toBe(1);
    expect(state.todos[0].text).toEqual(task.text);
    expect(state.todos[0].completed).toEqual(task.completed);
  });

  it('Проверяем удаление задачи', () => {
    const actionAdd = addTodo(task);
    const actionAddAfter = todoSlice(initState, actionAdd);
    const actionRemove = removeTodo(actionAddAfter.todos[0].id);
    const actionRemoveAfter = todoSlice(actionAddAfter, actionRemove);

    expect(actionRemoveAfter.todos.length).toBe(0);
  });

  it('Проверяем фильтрацию задачи', () => {
    const actionAdd = addTodo(task);
    const actionAddAfter = todoSlice(initState, actionAdd);
    const actionFilter = filterTodos({ filter: 'completed' });
    const actionFilterAfter = todoSlice(actionAddAfter, actionFilter);

    expect(actionFilterAfter.todos.length).toBe(0);
  });

  it('Проверяем выполнение задачи', () => {
    const actionAdd = addTodo(task);
    const actionAddAfter = todoSlice(initState, actionAdd);
    const actionCompleted = completedTodo({ id: actionAddAfter.todos[0].id });
    const actionCompletedAfter = todoSlice(actionAddAfter, actionCompleted);
    expect(actionCompletedAfter.todos[0].completed).toBe(true);
  });
});
