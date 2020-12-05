import { Button, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import React , { useState } from 'react';
import { List } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import './Todo.css'
import db from './firebase'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState();
    const [modalStyle] = React.useState(getModalStyle);


    const updateTodo = () => {
        // update the todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false)
    }

    return (
        <>
        <Modal
            open={open}
            onClose={ e => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                {/* <h1>open</h1> */}
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemAvatar> 
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary=""/>
            </ListItem>
            <EditIcon onClick={e => setOpen(true)}>Edit</EditIcon>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
        </List>
        </>
    )
}

export default Todo;
