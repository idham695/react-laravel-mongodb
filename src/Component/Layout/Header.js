import { Link, redirect } from 'react-router-dom';
import { useState } from 'react';


const Header = () => {
  const [setToken] = useState();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    redirect('/login');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={"/"} className="navbar-brand">Malilkids</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mr-auto" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={"/barang"} className="nav-link nav-item">Barang</Link>
          </div>
        </div>
        <span className="navbar-text">
        <Link onClick={handleLogout} className="nav-link nav-item">Logout</Link>
        </span>
      </div>
    </nav>
  )
}

export default Header