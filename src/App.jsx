import React, { useState } from 'react';
import styled from "@emotion/styled";

const Container = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
`;

const AddButton = styled.button`
  background: #007bff;
  color: rgba(255, 255, 255, 0.897);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const TaskItem = styled.li`
  background: white;
  margin-bottom: 0.75rem;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ completed }) => (completed ? '#aaa' : '#333')};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 0.4rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background: ${({ color }) => color || '#007bff'};
  color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEditing = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: editText } : t
    ));
    setEditId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <Container>
      <Title>📝 To-Do List</Title>
      <InputGroup>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <AddButton onClick={addTask}>Add</AddButton>
      </InputGroup>
      <TaskList>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            completed={task.completed}
            onClick={() => toggleComplete(task.id)}
          >
            {editId === task.id ? (
              <>
                <EditInput
                  value={editText}
                  onClick={e => e.stopPropagation()}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <ButtonGroup onClick={e => e.stopPropagation()}>
                  <Button color="#28a745" onClick={() => saveEdit(task.id)}>Save</Button>
                  <Button color="#6c757d" onClick={cancelEdit}>Cancel</Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                {task.text}
                <ButtonGroup onClick={e => e.stopPropagation()}>
                  <Button color="#ffc107" onClick={() => startEditing(task)}>Edit</Button>
                  <Button color="#dc3545" onClick={() => deleteTask(task.id)}>❌</Button>
                </ButtonGroup>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}
