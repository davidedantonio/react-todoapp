import axios from "axios";

const todos = axios.create({
  baseURL: 'http://localhost:3001'
});

const getAllTodos = async () => {
  try {
    const response = await todos.get('/todos');
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
}

const addNewTodo = async (todo) => {
  try {
    await todos.post('/todos', todo);
  } catch (e) {
    throw new Error(e.message);
  }
}

const updateTodo = async (todo, done) => {
  try {
    await todos.put(`/todos/${todo.id}`, {
      ...todo,
      done: done
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

const deleteTodo = async (id) => {
  try {
    await todos.delete(`/todos/${id}`);
  } catch (e) {
    throw new Error(e.message);
  }
}

export {
  getAllTodos,
  addNewTodo,
  updateTodo,
  deleteTodo
}