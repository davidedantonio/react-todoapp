import { Form, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const Item = ({
  item,
  setDone,
  checked,
  deleteTodo
}) => {
  
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-start">
      <Form.Check 
        type={'checkbox'}
        checked={checked}
        label={item.description}
        onClick={e => setDone(item.id, e.target.checked)}
      />
      <OverlayTrigger
        overlay={
          <Tooltip>
            Elimina
          </Tooltip>
        }
      >
        <div className="text-danger" role="button">
          <AiFillDelete onClick={() => deleteTodo(item.id)} />
        </div>
      </OverlayTrigger>
    </ListGroup.Item>
  );
}

export default Item;