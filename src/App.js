import { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import BadgeTab from "./components/BadgeTab";
import Item from "./components/Item";

function App() {
  const [ todos, setTodos ] = useState([
    { id: 1, description: 'Learn JavaScript', done: false },
    { id: 2, description: 'Learn Node.js', done: false }
  ]);

  const [ toAdd, setToAdd ] = useState('');

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      description: toAdd,
      done: false
    };

    setTodos([...todos, newTodo]);
    setToAdd('');
  }

  const done = (id, isDone) => {
    const newTodos = [];
    
    for (const todo of todos) {
      if (todo.id === id) {
        Object.assign(todo, {
          done: isDone
        });
      }

      newTodos.push(todo);
    }

    setTodos(newTodos);
  }
  
  return (
    <Container>
      <Row>
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
                  {todos.filter(item => !item.done).map(item => <Item item={item} checked={false} setDone={done} />)}      
                </ListGroup>
            </Tab>
            <Tab 
              eventKey="done"
              title={<BadgeTab title={'Done'} number={todos.filter(item => item.done).length} type={'success'} />}>
                <ListGroup className="mt-5">
                  {todos.filter(item => item.done).map(item => <Item item={item} checked={true} setDone={done} />)} 
                </ListGroup>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
