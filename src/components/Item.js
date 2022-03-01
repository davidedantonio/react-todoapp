import { Form, ListGroup } from "react-bootstrap";

const Item = ({
  item,
  setDone,
  checked
}) => {
  
  return (
    <ListGroup.Item>
      <Form.Check 
        type={'checkbox'}
        checked={checked}
        label={item.description}
        onClick={e => setDone(item.id, e.target.checked)}
      />
    </ListGroup.Item>
  );
}

export default Item;