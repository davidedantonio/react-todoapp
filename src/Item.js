const Item = ({
  item,
  setDone,
  checked
}) => {
  
  return (
    <div>
      <input 
        checked={checked}
        type={'checkbox'}
        onClick={e => setDone(item.id, e.target.checked)}
      /> {item.description}
    </div>
  );
}

export default Item;