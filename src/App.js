import { useState } from "react";
import Item from "./Item";

function App() {
  const [ todos, setTodos ] = useState([
    { id: 1, description: 'Learn JavaScript' },
    { id: 2, description: 'Learn Node.js' }
  ]);

  const [ dones, setDones ] = useState([]);

  const [ toAdd, setToAdd ] = useState('');

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      description: toAdd
    };

    setTodos([...todos, newTodo]);
    setToAdd('');
  }

  const done = (id, isDone) => {
    if (isDone) {
      const item = todos.find(item => item.id === id);
      setDones([...dones, item]);
      setTodos(todos.filter(item => item.id !== id));
    } else {
      const item = dones.find(item => item.id === id);
      setTodos([...todos, item]);
      setDones(dones.filter(item => item.id !== id));
    }
  }

  return (
    <div className="App">

      <h1>Todo</h1>
      <input type={'text'} value={toAdd} onChange={e => setToAdd(e.target.value)} />
      <button onClick={addTodo}>ADD</button>

      {todos.map(item => <Item item={item} checked={false} setDone={done} />)}

      <h1>Dones</h1>
      {dones.map(item => <Item item={item} checked={true} setDone={done} />)}

    </div>
  );
}

export default App;
