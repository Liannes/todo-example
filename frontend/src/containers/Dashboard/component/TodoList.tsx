import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { addTodo, completedTodo, editTodo, removeTodo } from '@redux/slices/todoSlice';
import { AppDispatch, RootState } from '@redux/store';

import { ITodo } from 'types/ITodo';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

interface EditState {
  id: number | null;
  isEditing: boolean;
}

const TodoList = () => {
  const initialEditState: EditState = { id: null, isEditing: false };

  const [inputValue, setInputValue] = useState('');
  const [editState, setEditState] = useState<EditState>(initialEditState);

  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const resetState = (): void => {
    setInputValue('');
    setEditState(initialEditState);
  };

  const handleAddTodo = (): void => {
    if (!inputValue.trim()) {
      toast.error('Введите текст задачи');
      return;
    }

    const newTask: ITodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    dispatch(addTodo(newTask));
    resetState();
    toast.success('Задача добавлена');
  };

  const handleToggleTodo = (idTask: number): void => {
    dispatch(completedTodo({ id: idTask }));
    const todo = todos.find(i => i.id === idTask);
    toast.success(todo?.completed ? 'Задача возвращена в работу' : 'Задача выполнена');
  };

  const handleDeleteTodo = (idTask: number): void => {
    dispatch(removeTodo({ id: idTask }));
    toast.success('Задача удалена');
  };

  const handleStartEdit = (idTask: number, text: string): void => {
    setInputValue(text);
    setEditState({ id: idTask, isEditing: true });
  };

  const handleEditTodo = (): void => {
    if (!inputValue.trim() || !editState.id) return;
    dispatch(editTodo({ id: editState.id, text: inputValue }));
    resetState();
    toast.success('Задача изменена');
  };

  return (
    <div className="todo__container">
      <TodoForm
        value={inputValue}
        editState={editState}
        onChange={setInputValue}
        onAdd={handleAddTodo}
        onEdit={handleEditTodo}
      />
      <div className="todo__list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onEdit={handleStartEdit}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
