import { filterTodos } from '@redux/slices/todoSlice';
import { AppDispatch } from '@redux/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from './Button';

const Header = () => {
  const [state, setState] = useState<string>('all');
  const dispatch = useDispatch<AppDispatch>();

  const handleActiveButton = (status: string): string => {
    return state === status ? 'button-filter active' : 'button-filter';
  };

  const handleSetFilterTodoList = (status: string): void => {
    setState(status);
    dispatch(filterTodos({ filter: status }));
  };

  return (
    <header className="header">
      <h1 className="header__title">Todo</h1>
      <div className="header__button">
        <Button
          type="button"
          title="Добавить"
          className={handleActiveButton('all')}
          onClick={() => handleSetFilterTodoList('all')}
        >
          <span>Все</span>
        </Button>
        <Button
          type="button"
          title="Активные"
          className={handleActiveButton('active')}
          onClick={() => handleSetFilterTodoList('active')}
        >
          <span>Активные</span>
        </Button>
        <Button
          type="button"
          title="Завершенные"
          className={handleActiveButton('completed')}
          onClick={() => handleSetFilterTodoList('completed')}
        >
          <span>Завершенные</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
