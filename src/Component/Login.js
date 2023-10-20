import { useState } from "react";

const Login = ({handleLogin}) => {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <form method="post" onSubmit={ async (e) => {
                e.preventDefault();
                handleLogin(email, password)
            }}>
                <div className="row">
                    <div className="col-md-4">Email</div>
                    <div className="col-md-8"><input type="email" className="form-control" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required  /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">Password</div>
                    <div className="col-md-8"><input type="password" className="form-control" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required /></div>   
                </div>
                <div className="text-center mt-3"><button type="submit" className="btn btn-primary">Submit</button></div>
            </form>
        </div>

    )
}


export default Login;