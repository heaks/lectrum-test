import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { cv } from './styles';

const Block = ({ title, description, index, removeBlock }) => (
  <div style={cv.block}>
    <div style={cv.contentWrapper}>
      <span>{`${title} :`}</span>
      <span>{description}</span>
    </div>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => removeBlock(index)}
      style={cv.button}
    >
      Remove Item
    </Button>
  </div>
);

const getInitialState =  (name) => {
  return [
    { title: 'Name', description: name },
    { title: 'Position', description: 'Full Stack Developer' },
  ]
};

const CV = ({ history }) => {
  const [blocks, setBlocks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const clearInputs = () => {
    setNewDescription('');
    setNewTitle('');
  };

  // TODO: workaround for private routes
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/error');
    } else {
      const name = localStorage.getItem('username');
      setBlocks(getInitialState(name));
    }
  }, []);

  const addBlock = (title, description) => {
    setBlocks([...blocks, { title, description }]);
    clearInputs();
  };

  const removeBlock = (index) => setBlocks([...blocks.slice(0, index), ...blocks.slice(index + 1)]);

  return (
    <div style={cv.wrapper}>
      <h2>CV</h2>
      {blocks.map(({ title, description }, index) => (
        <Block
          title={title}
          description={description}
          index={index}
          key={title + index}
          removeBlock={removeBlock}
        />)
      )}
      <div>
        <TextField
          style={cv.textField}
          label="Title"
          onChange={e => setNewTitle(e.target.value)}
        />
        <TextField
          style={cv.textField}
          label="Description"
          onChange={e => setNewDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => addBlock(newTitle, newDescription)}
          style={cv.button}
        >
          Add Item
        </Button>
      </div>
    </div>
  )
};

export default withRouter(CV);