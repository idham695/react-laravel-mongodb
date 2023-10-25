// import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import axios from "axios";
import { useState, useEffect } from 'react';
import AuthContext from './Context/AuthContext';
import Dashboard from './Component/Dashboard';
import Barang from './Component/Barang';
import FormBarang from './Component/FormBarang';
import NotFound from './Component/NotFound';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

const loginUser = async (data) => {
  let response = await axios.post('http://localhost:3200/api/login', {
    email: data.email,
    password : data.password
  });
  return response.data.token;
}

function App() {
  // app
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onHandleLogin = async (email, password) => {
    const login = await loginUser({
      email, password
    });
    setToken(login);
    window.localStorage.setItem("token", login);
  };

  const refreshToken = async () => {
    setLoading(true);
    const getToken = window.localStorage.getItem("token");
    if (!getToken) return setLoading(false); setToken('');  navigate('/login');
    window.localStorage.setItem("token", getToken);
    setToken(getToken);
    setLoading(false);
  }

  useEffect(() => {
    refreshToken();
  }, [])

  return (
    <>
    { loading ? <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>Loading...</div> : 
    <AuthContext.Provider value={token}>
      <div className="App">
        <Routes>
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" /> }></Route>
          <Route path="/barang" element={token ? <Barang /> : <Navigate to="/login" />  }></Route>
          <Route path="/barang/add" element={token ? <FormBarang action="add" /> : <Navigate to="/login" />  }></Route>
          <Route path="/barang/edit/:id" element={token ? <FormBarang action="edit"  /> : <Navigate to="/login" />  }></Route>

          <Route path="/login" element={token ? <Navigate to="/" /> : <Login handleLogin={ onHandleLogin } /> }></Route>
          <Route path="*" element=<NotFound />></Route>
        </Routes>
      </div>
    </AuthContext.Provider>
    }
    </>
  );
}

export default App;
