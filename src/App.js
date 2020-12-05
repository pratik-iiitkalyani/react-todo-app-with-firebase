import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo'
import './App.css';
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app is loaded, we need to listen to the database and fetch new todos as they get removed/added.
  useEffect(() => {
    // fires when the app.js loaded
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // setTodos(snapshot.docs.map(doc => doc.data().todo))
      // const data = )
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
      // console.log("data", data)
    })
  }, [])

  const addTodo = (event ) => {
     // this will fire up when we click on button 
    event.preventDefault(); // stop the refreshing
    db.collection('todos').add({
      todo: input,
      timestamp:  firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')  // clear up the input after hitting the submit
    // console.log(todos)
  }
  return (
    <div className="App">
      <h1>React Todo Application </h1>
      <FormControl>
        <InputLabel> Write a Todo </InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
        {/* <button onClick = {addTodo}>Add Todo</button> */}
      </FormControl>
      <Button disabled={!input} variant="contained" color="primary" type="submit" onClick = {addTodo}>
          Add Todo
      </Button>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
