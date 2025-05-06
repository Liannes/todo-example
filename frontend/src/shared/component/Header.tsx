import { filterTodos } from '@redux/slices/todoSlice';
import { AppDispatch } from '@redux/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from './Button';

const enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const filterOptions = [
  { status: FilterStatus.ALL, label: 'Все' },
  { status: FilterStatus.ACTIVE, label: 'Активные' },
  { status: FilterStatus.COMPLETED, label: 'Завершенные' },
];

const Header = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>(FilterStatus.ALL);
  const dispatch = useDispatch<AppDispatch>();

  const handleActiveButton = (status: FilterStatus): string => {
    return `button-filter${currentFilter === status ? ' active' : ''}`;
  };

  const handleSetFilterTodo = (status: FilterStatus): void => {
    setCurrentFilter(status);
    dispatch(filterTodos({ filter: status }));
  };

  return (
    <header className="header">
      <h1 className="header__title">Todo</h1>
      <div className="header__button">
        {filterOptions.map(({ status, label }) => (
          <Button
            key={status}
            type="button"
            title={label}
            className={handleActiveButton(status)}
            onClick={() => handleSetFilterTodo(status)}
          >
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;
