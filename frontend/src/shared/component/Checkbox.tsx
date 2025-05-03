import { useId } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const id = useId();

  return (
    <div className='checkbox'>
      <input id={id} checked={checked} className="checkbox-input" type="checkbox" onChange={onChange} />
      <label htmlFor={id} className="checkbox-label"></label>
    </div>
  );
};

export default Checkbox;
