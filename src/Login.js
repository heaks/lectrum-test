import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import { registration, errorContainer } from './styles';

const Login = ({ history  }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [failedLoginsCount, setFailedLoginsCount] = useState(0);
  const [blockTimeStamp, setBlockTimeStamp] = useState(null);

  const blockUser = () => {
    setFailedLoginsCount(0);
    setBlockTimeStamp((+new Date()) + 60 * 1000);
  };

  const onLogin = () => {
    if (blockTimeStamp && blockTimeStamp > new Date()) {
      return setErrorMessage('Too many failed attempts, try in one minute');
    }

    const storageLogin = localStorage.getItem('username');
    const storagePassword = localStorage.getItem('password');

    if (storageLogin !== login) {
      return setErrorMessage('User Unknown');
    }
    if (storagePassword !== password) {
      setFailedLoginsCount(failedLoginsCount + 1);
      if (failedLoginsCount >= 3) {
        setErrorMessage('Too many failed attempts, try in one minute');
        return blockUser();
      }
      return setErrorMessage('Invalid Password');
    }
    localStorage.setItem('token', 'mockTokenData');
    setErrorMessage(null);
    history.push('/cv');
  };

  return (
    <div style={registration}>
      <h2>Login Page</h2>
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
          onClick={onLogin}
        >
          Login
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

export default withRouter(Login);