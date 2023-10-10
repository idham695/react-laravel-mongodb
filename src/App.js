import logo from './logo.svg';
import './App.css';
import Login from './Login';
import axios from "axios";
import { useState, useEffect } from 'react';
import AuthContext from './Context/AuthContext';
import Dashboard from './Dashboard';
import { Route, Routes, useNavigate } from 'react-router-dom';

const loginUser = async (data) => {
  let response = await axios.post('http://localhost/malilkids-api/api/login', {
    email: data.email,
    password : data.password
  });
  return response.data.token;
}

function App() {
  // app
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const onHandleLogin = async (email, password) => {
    const login = await loginUser({
      email, password
    });
    setToken(login);
    window.localStorage.setItem("token", login);
  };

  const refreshToken = async () => {
    const getToken = window.localStorage.getItem("token");
    if (!getToken) return navigate('/login');
    try {
      let newToken = await axios.post('http://localhost/malilkids-api/api/refresh', [], {
        headers: {
          'Authorization': 'Bearer ' + getToken
        }
      });
      if (newToken.data.code === 401) return navigate('/login');
      setToken(newToken.data.token);
      window.localStorage.setItem("token", newToken.data.token);
      return navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  // routes
  <Routes>
    <Route path="/" element={<Dashboard /> }></Route>
    <Route path="/login" element={<Login handleLogin={ onHandleLogin } /> }></Route>
  </Routes>

  useEffect(() => {
    refreshToken();
  },[])
  return (
    <AuthContext.Provider value={token}>
      <div className="App">
        { token ? <Dashboard /> : <Login handleLogin={ onHandleLogin } />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
