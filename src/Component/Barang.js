import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, redirect } from 'react-router-dom';

const Barang = () => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
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
                redirect('/login');
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
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                        data.map((row, index) => {
                            return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{row.title}</td>
                                <td>{row.description}</td>
                            </tr>)
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