import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { ITodo } from '../../redux/slices/ITodo';
import { toast } from 'react-toastify';
import { Plus, Check2, Trash3 } from 'react-bootstrap-icons';
import { addTodo, removeTodo, completedTodo, filterTodos } from '../../redux/slices/todoSlice';

const TableTodo: React.FC = () => {
  const [value, setValue] = useState('');
  const [statusTodo, setStatusTodo] = useState('');
  const [activeLink, setActiveLink] = useState('all');
  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodoList = (): void => {
    if (value === '') {
      toast.error('Введите текст задачи');
      return;
    }
    const seconds = new Date().getTime() / 1000;
    const newTask: ITodo = {
      id: seconds,
      text: value,
      completed: false,
    };
    dispatch(addTodo(newTask));
    setStatusTodo('Задача добавлена');
    setValue('');
  };

  const handleRemoveTodoList = (idTask: number): void => {
    setStatusTodo('Задача удалена');
    dispatch(removeTodo({ id: idTask }));
  };

  const handleCompletedTodoList = (idTask: number): void => {
    setStatusTodo('Задача выполнена');
    dispatch(completedTodo({ id: idTask }));
  };

  const handleSetFilterTodoList = (status: string): void => {
    setActiveLink(status);
    dispatch(filterTodos({ filter: status }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target as HTMLInputElement;
    setValue(value);
  };

  const getListTodo = (props: ITodo): JSX.Element => {
    const { id, text, completed } = props;
    return (
      <li className="todo-body__list__container">
        <div className="todo-body__list__item">
          <p className={`${completed ? 'text-done' : ''} text`}>{text}</p>
          <div>
            <button className="button" onClick={() => handleCompletedTodoList(id)}>
              <Check2 />
            </button>
            <button className="button" onClick={() => handleRemoveTodoList(id)}>
              <Trash3 />
            </button>
          </div>
        </div>
      </li>
    );
  };

  const getClassName = (type: string) => {
    if (activeLink === type) return 'active-link';
    return 'link';
  };

  useEffect(() => {
    return () => {
      setInterval(() => {
        setStatusTodo('');
      }, 10000);
    };
  }, [statusTodo]);

  return (
    <div className="todo">
      <div className="todo-container">
        <div className="todo-header">
          <p className="todo-header__text">Список задач</p>
        </div>
        <div className="todo-body">
          <div className="todo-body__search mb-3">
            <input
              className="input"
              type="text"
              value={value}
              onChange={e => handleChangeInput(e)}
              placeholder="Напишите задачу"
            />
            <Plus onClick={() => handleAddTodoList()} />
          </div>
          <div className="todo-body__filter my-2">
            <a href="#" className={getClassName('all')} id="all" onClick={() => handleSetFilterTodoList('all')}>
              Все
            </a>
            <a
              href="#"
              className={`${getClassName('active')}`}
              id="active"
              onClick={() => handleSetFilterTodoList('active')}
            >
              Не выполненные
            </a>
            <a
              href="#"
              className={`${getClassName('completed')}`}
              id="completed"
              onClick={() => handleSetFilterTodoList('completed')}
            >
              Выполненные
            </a>
          </div>
          <div className="todo-body__list">
            <h5 className="todo-body__status my-2">{statusTodo}</h5>
            {todos.map((item, index) => {
              return <ul key={item.id}>{getListTodo(item)}</ul>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableTodo;
