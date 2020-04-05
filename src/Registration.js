import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { registration, errorContainer } from './styles';

const Registration = ({ history  }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = () => {
    console.log('SUBMIT');
    console.log('password:', password);

    const regExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

    if (regExp.test(password)) {
      console.log('Registration successful');
      localStorage.setItem('username', login);
      localStorage.setItem('password', password);
      setErrorMessage(null);
      history.push('/login');
    } else {
      setErrorMessage('Password should contain at least 8 letters, one lowercase, one uppercase, one special character and numbers');
    }
  };

  return (
    <div style={registration}>
      <h2>Registration Page</h2>
      <div>
        <TextField
          label="Login"
          onChange={e => setLogin(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </div>
      {errorMessage && (
        <div style={errorContainer}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  )
};

export default withRouter(Registration);