import Button from '@shared/component/Button';
import { PencilSquare, Plus } from 'react-bootstrap-icons';

interface EditState {
  id: number | null;
  isEditing: boolean;
}

interface TodoFormProps {
  value: string;
  editState: EditState;
  onChange: (value: string) => void;
  onAdd: () => void;
  onEdit: () => void;
}

const TodoForm = ({ value, editState, onChange, onAdd, onEdit }: TodoFormProps) => (
  <div className="todo__block-add">
    <input
      placeholder="Напишите тут задачу..."
      type="text"
      className="todo__block-add__input"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <Button
      className={editState.isEditing ? 'button-edit' : 'button-add'}
      onClick={editState.isEditing ? onEdit : onAdd}
    >
      {editState.isEditing ? (
        <>
          <PencilSquare /> Изменить
        </>
      ) : (
        <>
          <Plus /> Добавить
        </>
      )}
    </Button>
  </div>
);

export default TodoForm;
