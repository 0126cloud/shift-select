
const Checkbox = ({ checked, hidden, onChange = () => { } }) => {
  return (
    hidden
      ? ''
      : (
        <input
          className='checkbox'
          type='checkbox'
          checked={checked}
          onChange={e => onChange(e)} />
      )
  );
};

export default Checkbox
