import Button from '@shared/component/Button';
import Checkbox from '@shared/component/Checkbox';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { ITodo } from 'types/ITodo';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const { id, text, completed } = todo;

  return (
    <div className={`todo__list-item${completed ? ' completed' : ''}`}>
      <div className="todo__list-item__row">
        <div className="todo__list-item__block">
          <Checkbox checked={completed} onChange={() => onToggle(id)} />
          <p className="todo__list-item__text">{text}</p>
        </div>
        <div className="todo__list-item__block">
          <Button
            type="button"
            title="Изменить"
            className="button-action"
            onClick={() => onEdit(id, text)}
          >
            <Pencil />
          </Button>
          <Button
            type="button"
            title="Удалить"
            className="button-action"
            onClick={() => onDelete(id)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
