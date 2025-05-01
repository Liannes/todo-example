import { useId } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const id = useId();

  return (
    <>
      <input id={id} checked={checked} className="checkbox" type="checkbox" onChange={onChange} />
      <label htmlFor={id} className="checkbox-label"></label>
    </>
  );
};

export default Checkbox;
