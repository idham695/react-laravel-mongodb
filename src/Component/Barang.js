import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Barang = () => {
    const [data, setData] = useState([]);
    const fecthData = async () => {
        let getData = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(getData);
        setData(getData.data || []);
    }

    useEffect(() => {
        fecthData();
    },[]);

    return (
        <>
        <Header />
        <div className="container mt-3" style={{marginBottom:"100px"}}>
            <h1>Barang</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => {
                            return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{row.title}</td>
                                <td>{row.body}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
        <Footer />
        </>
    );
}


export default Barang