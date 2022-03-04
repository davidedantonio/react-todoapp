import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import { getAllTodos, addNewTodo, updateTodo, deleteTodo } from "./api/todos";
import BadgeTab from "./components/BadgeTab";
import Item from "./components/Item";

function App() {
  const [ todos, setTodos ] = useState([]);
  const [ toAdd, setToAdd ] = useState('');
  const [ error, setError ] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const list = await getAllTodos();
      setTodos(list);
    } catch (e) {
      setError(e.message);
    }
  }

  const addTodo = async () => {
    const newTodo = {
      id: Date.now(),
      description: toAdd,
      done: false
    };

    try {
      await addNewTodo(newTodo);
      const allTodos = await getAllTodos();
      setTodos(allTodos);
    } catch (e) {
      setError(e.message);
    }
  }

  const done = async (id, isDone) => {
    try {
      const todo = todos.find(item => item.id === id);
      await updateTodo(todo, isDone);
      const allTodos = await getAllTodos();
      setTodos(allTodos);
    } catch (e) {
      setError(e.message);
    }
    
  }

  const deleteTodoItem = async (id) => {
    try {
      await deleteTodo(id);
      const allTodos = await getAllTodos();
      setTodos(allTodos);
    } catch (e) {
      setError(e.message);
    }
    
  }
  
  return (
    <Container>
      <Row>
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Col xs={12}>
          <Tabs 
            defaultActiveKey="todo"
            className="mb-3"
            >
            <Tab
              eventKey="todo"
              title={<BadgeTab title={'To-do'} number={todos.filter(item => !item.done).length} type={'warning'} />}>
                <Container fluid className="gx-0">
                  <Row>
                    <Col xs={8}>
                      <Form.Control
                        type="text"
                        value={toAdd}
                        onChange={e => setToAdd(e.target.value)}
                      />
                    </Col>
                    <Col xs={4}>
                      <Button variant={'primary'} onClick={addTodo}>ADD</Button>
                    </Col>
                  </Row>
                </Container>

                <ListGroup className="mt-5">
                  {todos.filter(item => !item.done).map(item => <Item item={item} checked={false} setDone={done} deleteTodo={deleteTodoItem} />)}      
                </ListGroup>
            </Tab>
            <Tab 
              eventKey="done"
              title={<BadgeTab title={'Done'} number={todos.filter(item => item.done).length} type={'success'} />}>
                <ListGroup className="mt-5">
                  {todos.filter(item => item.done).map(item => <Item item={item} checked={true} setDone={done} deleteTodo={deleteTodoItem} />)} 
                </ListGroup>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
