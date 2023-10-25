import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Barang = () => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            let getData = await axios.get('http://localhost:3200/api/barang', {
                headers : {
                    'Authorization' : 'Bearer ' + token
                }
            });
            setData(getData.data.barang || []);
        } catch (error) {
            if(error.response.data.code === 401){
                localStorage.removeItem('token');
                setToken('');
                window.location.reload();
                return navigate('/login');
            }
        }
    }

    const deleteBarang = async (id) => {
        try {
            await axios.post('http://localhost:3200/api/barang/delete/'+id, [], {
                headers : {
                    'Authorization' : 'Bearer ' + token
                }
            });
            fetchData();
        } catch (error) {
            if(error.response.data.code === 401){
                localStorage.removeItem('token');
                setToken('');
                window.location.reload();
                return navigate('/login');
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Header />
        <div className="container mt-3" style={{marginBottom:"100px"}}>
            <h1>Barang</h1>
            <Link to={"/barang/add"} className="btn btn-primary btn-sm mb-4" style={{float:"right"}}>Add Data</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                        data.map((row, index) => {
                            return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{row.title}</td>
                                <td>{row.description}</td>
                                <td>
                                    <Link to={`/barang/edit/${row._id}`} className="btn btn-warning btn-sm">Edit</Link> &nbsp;
                                    <button onClick={() => deleteBarang(row._id)}  className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                            )
                        }) : <tr>
                            <td colSpan={"3"} style={{textAlign:"center"}}>Data tidak ada</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
        <Footer />
        </>
    );
}


export default Barang