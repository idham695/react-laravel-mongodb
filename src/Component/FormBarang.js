import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormBarang = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const postBarang = async (title, description) => {
        try {
            await axios.post('http://localhost:3200/api/barang/store', {
              title : title,
              description : description
            }, {
                headers : {
                    'Authorization' : 'Bearer ' + token
                }
            });
            return navigate('/barang');
        } catch (error) {
            if(error.response.data.code === 401){
                localStorage.removeItem('token');
                setToken('');
                window.location.reload();
                return navigate('/login');
            }
        }
    }

    return (
        <>
        <Header />
        <div className="container mt-3" style={{marginBottom:"100px"}}>
            <h1>Barang</h1>
            <form method="post" onSubmit={async (e) => {
              e.preventDefault();
              postBarang(title, description);
            }}>
            <div className="row">
                <div className="col-md-4">Title</div>
                <div className="col-md-8"><input type="text" className="form-control" name="email" id="email" onChange={(e) => setTitle(e.target.value)} required  /></div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">Description</div>
                <div className="col-md-8"><textarea name="description" className="form-control" id="desctiprion" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)} required></textarea></div>   
            </div>
            <div className="text-right mt-3"><button type="submit" className="btn btn-primary">Submit</button></div>
            </form>
        </div>
        <Footer />
        </>
    );
}


export default FormBarang