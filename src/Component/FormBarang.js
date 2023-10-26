import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const FormBarang = (data) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    let { id } = useParams();
    
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

    const editBarang = async (title, description) => {
        try {
            await axios.post('http://localhost:3200/api/barang/update/' + id, {
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

    const getDataById = async(id) => {
        try {
            const dataBarangById = await axios.get('http://localhost:3200/api/barang/'+id, {
                headers : {
                    'Authorization' : 'Bearer ' + token
                }
            });
            setDescription(dataBarangById.data.barang.description);
            setTitle(dataBarangById.data.barang.title);
        } catch (error) {
            if(error.response.data.code === 401){
                localStorage.removeItem('token');
                setToken('');
                window.location.reload();
                return navigate('/login');
            }
        }
    }


    const handleChangeFile = (e) => {
        let uploadFile = e.target.files[0];
        
        if (uploadFile.type !== 'image/png') {
            alert('Hanya Dapat Upload Type PNG');
        }

        const img = new Image();

        img.onload = () => {
            const width = img.width;
            const height = img.height;

            console.log(`Image width: ${width}px, height: ${height}px`);
        };

        img.src = URL.createObjectURL(uploadFile);
    }
    

    useEffect(() => {
        if(data.action === 'edit') getDataById(id);
    }, []);

    return (
        <>
        <Header />
        <div className="container mt-3" style={{marginBottom:"100px"}}>
            <h1>Barang</h1>
            <form method="post" onSubmit={async (e) => {
              e.preventDefault();
              if(data.action === 'edit'){
                editBarang(title, description);
              }else {
                postBarang(title, description);
              }
            }}>
            <div className="row">
                <div className="col-md-4">Title</div>
                <div className="col-md-8"><input type="text" className="form-control" name="email" id="email" value={title} onChange={(e) => setTitle(e.target.value)} required  /></div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">File</div>
                <div className="col-md-8"><input type="file" className="form-control" name="file" id="file" accept="image/png" onChange={handleChangeFile}  required  /></div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">Description</div>
                <div className="col-md-8"><textarea name="description" className="form-control" id="desctiprion" value={description} cols="30" rows="10" onChange={(e) => setDescription(e.target.value)} required></textarea></div>   
            </div>
            <div className="text-right mt-3"><button type="submit" className="btn btn-primary">Submit</button></div>
            </form>
        </div>
        <Footer />
        </>
    );
}


export default FormBarang